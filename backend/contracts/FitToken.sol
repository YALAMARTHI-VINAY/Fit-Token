// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";


contract FitToken is ERC20, Ownable, ReentrancyGuard {
    
    struct UserActivity {
        uint256 totalSteps;
        uint256 totalWorkouts;
        uint256 lastActivityTimestamp;
        uint256 totalTokensEarned;
    }
    
    struct Milestone {
        uint256 stepsRequired;
        uint256 workoutsRequired;
        uint256 tokenReward;
        bool isActive;
    }
    
    mapping(address => UserActivity) public userActivities;
    mapping(uint256 => Milestone) public milestones;
    mapping(address => mapping(uint256 => bool)) public userMilestoneCompleted;
    
    uint256 public nextMilestoneId;
    uint256 public constant TOKENS_PER_STEP = 1e15; // 0.001 FIT per step
    uint256 public constant TOKENS_PER_WORKOUT = 1e18; // 1 FIT per workout
    uint256 public constant MAX_DAILY_TOKENS = 100e18; // 100 FIT max per day
    
    event ActivityRecorded(address indexed user, uint256 steps, uint256 workouts, uint256 tokensEarned);
    event MilestoneCompleted(address indexed user, uint256 milestoneId, uint256 reward);
    event MilestoneCreated(uint256 milestoneId, uint256 stepsRequired, uint256 workoutsRequired, uint256 reward);
    
    
    constructor() ERC20("FitToken", "FIT") Ownable(msg.sender) {
        _mint(msg.sender, 1000000e18); // Initial supply: 1M tokens
        // Create initial milestones
        createMilestone(10000, 0, 10e18); // 10k steps = 10 FIT
        createMilestone(0, 10, 15e18);    // 10 workouts = 15 FIT
        createMilestone(50000, 20, 100e18); // 50k steps + 20 workouts = 100 FIT
    }

    
    function recordActivity(
        address user,
        uint256 steps,
        uint256 workouts
    ) external onlyOwner nonReentrant {
        require(user != address(0), "Invalid user address");
        require(steps > 0 || workouts > 0, "No activity recorded");
        
        UserActivity storage activity = userActivities[user];
        
        // Calculate tokens to award
        uint256 stepTokens = steps * TOKENS_PER_STEP;
        uint256 workoutTokens = workouts * TOKENS_PER_WORKOUT;
        uint256 totalTokens = stepTokens + workoutTokens;
        
        // Apply daily limit
        if (block.timestamp - activity.lastActivityTimestamp < 1 days) {
            require(totalTokens <= MAX_DAILY_TOKENS, "Daily token limit exceeded");
        }
        
        // Update user activity
        activity.totalSteps += steps;
        activity.totalWorkouts += workouts;
        activity.lastActivityTimestamp = block.timestamp;
        activity.totalTokensEarned += totalTokens;
        
        // Mint tokens to user
        _mint(user, totalTokens);
        
        // Check and process milestones
        _checkMilestones(user);
        
        emit ActivityRecorded(user, steps, workouts, totalTokens);
    }
    
    function createMilestone(
        uint256 stepsRequired,
        uint256 workoutsRequired,
        uint256 tokenReward
    ) public onlyOwner {
        milestones[nextMilestoneId] = Milestone({
            stepsRequired: stepsRequired,
            workoutsRequired: workoutsRequired,
            tokenReward: tokenReward,
            isActive: true
        });
        
        emit MilestoneCreated(nextMilestoneId, stepsRequired, workoutsRequired, tokenReward);
        nextMilestoneId++;
    }
    
    function _checkMilestones(address user) internal {
        UserActivity memory activity = userActivities[user];
        
        for (uint256 i = 0; i < nextMilestoneId; i++) {
            Milestone memory milestone = milestones[i];
            
            if (milestone.isActive && 
                !userMilestoneCompleted[user][i] &&
                activity.totalSteps >= milestone.stepsRequired &&
                activity.totalWorkouts >= milestone.workoutsRequired) {
                
                userMilestoneCompleted[user][i] = true;
                _mint(user, milestone.tokenReward);
                
                emit MilestoneCompleted(user, i, milestone.tokenReward);
            }
        }
    }
    
    function getUserActivity(address user) external view returns (UserActivity memory) {
        return userActivities[user];
    }
    
    function getMilestone(uint256 milestoneId) external view returns (Milestone memory) {
        return milestones[milestoneId];
    }
}
