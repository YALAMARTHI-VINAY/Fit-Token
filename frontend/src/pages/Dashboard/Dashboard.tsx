import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { ethers } from 'ethers';
import fitTokenAbi from '../../contracts/FitToken.json';
import contractAddresses from '../../contracts/contract-address.json';

const MOCK_FITNESS_DATA = {
  steps: 8500,
  calories: 320,
  activeMinutes: 45,
  provider: 'Fitbit',
};

const Dashboard = () => {
  const { user, connectFitnessTracker, disconnect } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [fitBalance, setFitBalance] = useState('0.00');
  const [claiming, setClaiming] = useState(false);

  useEffect(() => {
    if (!user.isConnected) {
      navigate('/auth');
    }
  }, [user.isConnected, navigate]);

  // Fetch FitToken balance
  useEffect(() => {
    async function fetchBalance() {
      if (!user.address) return;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddresses.FitToken, fitTokenAbi.abi, provider);
      const balance = await contract.balanceOf(user.address);
      setFitBalance(ethers.utils.formatUnits(balance, 18));
    }
    fetchBalance();
  }, [user.address]);

  // Mock fitness data for now
  const fitnessData = user.fitnessData || MOCK_FITNESS_DATA;

  const handleConnectFitness = async (provider: string) => {
    setIsLoading(true);
    try {
      await connectFitnessTracker(provider);
    } catch (error) {
      console.error(`Error connecting ${provider}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleDisconnect = () => {
    disconnect();
    navigate('/');
  };

  // Claim tokens (mock logic: always allow claim for demo)
  const handleClaimTokens = async () => {
    setClaiming(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddresses.FitToken, fitTokenAbi.abi, signer);
      // For demo, just mint 10 tokens to user (replace with real logic later)
      const tx = await contract.transfer(user.address, ethers.utils.parseUnits('10', 18));
      await tx.wait();
      // Refresh balance
      const balance = await contract.balanceOf(user.address);
      setFitBalance(ethers.utils.formatUnits(balance, 18));
      alert('10 FIT claimed!');
    } catch (err) {
      alert('Claim failed: ' + (err.message || err));
    } finally {
      setClaiming(false);
    }
  };

  if (!user.isConnected) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white">FitToken Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span className="text-white text-sm">
                {user.address ? formatAddress(user.address) : 'Not connected'}
              </span>
            </div>
            <button
              onClick={handleDisconnect}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg text-sm transition-colors"
            >
              Disconnect
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Wallet Info Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 col-span-1"
          >
            <h2 className="text-lg font-medium text-white mb-4">Wallet Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-white/50">Wallet Address</p>
                <p className="text-white font-mono">
                  {user.address ? formatAddress(user.address) : 'Not connected'}
                </p>
              </div>
              <div>
                <p className="text-sm text-white/50">Network</p>
                <p className="text-white">Ethereum Mainnet</p>
              </div>
              <div>
                <p className="text-sm text-white/50">FIT Balance</p>
                <p className="text-2xl font-bold text-indigo-400">{fitBalance} FIT</p>
                <button
                  className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm transition-colors shadow"
                  onClick={handleClaimTokens}
                  disabled={claiming}
                >
                  {claiming ? 'Claiming...' : 'Claim Tokens'}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Fitness Trackers */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 col-span-1 lg:col-span-2"
          >
            <h2 className="text-lg font-medium text-white mb-4">Fitness Trackers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Fitbit', 'Google Fit', 'Apple Health'].map((provider) => {
                const isConnected = user.fitnessData?.provider === provider;
                return (
                  <div 
                    key={provider}
                    className={`p-4 rounded-xl border ${isConnected ? 'border-green-500/30 bg-green-500/10' : 'border-white/10'}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <img 
                        src={`/${provider.toLowerCase().replace(' ', '-')}.svg`} 
                        alt={provider} 
                        className="w-8 h-8"
                      />
                      <span className={`text-xs px-2 py-1 rounded-full ${isConnected ? 'bg-green-500/20 text-green-300' : 'bg-white/10 text-white/70'}`}>
                        {isConnected ? 'Connected' : 'Not Connected'}
                      </span>
                    </div>
                    <h3 className="text-white font-medium mb-2">{provider}</h3>
                    <button
                      onClick={() => handleConnectFitness(provider)}
                      disabled={isLoading || isConnected}
                      className={`w-full mt-2 text-sm py-2 rounded-lg ${isConnected 
                        ? 'bg-white/5 text-white/50 cursor-not-allowed' 
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
                    >
                      {isLoading ? 'Connecting...' : isConnected ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Fitness Stats */}
          {user.fitnessData && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 col-span-1 lg:col-span-3"
            >
              <h2 className="text-lg font-medium text-white mb-6">Your Activity</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white/70">Steps</h3>
                    <div className="p-2 bg-indigo-500/20 rounded-lg">
                      <img src="/footsteps.svg" alt="Steps" className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-white">{fitnessData.steps.toLocaleString()}</p>
                  <p className="text-sm text-green-400 mt-2">+12% from yesterday</p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white/70">Calories</h3>
                    <div className="p-2 bg-amber-500/20 rounded-lg">
                      <img src="/fire.svg" alt="Calories" className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-white">{fitnessData.calories.toLocaleString()}</p>
                  <p className="text-sm text-green-400 mt-2">+5% from yesterday</p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white/70">Active Minutes</h3>
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <img src="/clock.svg" alt="Active Minutes" className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-white">{fitnessData.activeMinutes} min</p>
                  <p className="text-sm text-green-400 mt-2">+8% from yesterday</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-white/70 mb-4">Daily Activity</h3>
                <div className="h-48 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                  <p className="text-white/50">Activity chart will be displayed here</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Recent Activities */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 col-span-1 lg:col-span-3"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-white">Recent Activities</h2>
              <button className="text-sm text-indigo-400 hover:text-indigo-300">View All</button>
            </div>
            <div className="space-y-4">
              {[
                { id: 1, type: 'walking', duration: '32 min', calories: 120, time: '2 hours ago' },
                { id: 2, type: 'running', duration: '18 min', calories: 240, time: '5 hours ago' },
                { id: 3, type: 'cycling', duration: '45 min', calories: 380, time: '1 day ago' },
              ].map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-indigo-500/20 rounded-lg">
                      <img 
                        src={`/${activity.type}.svg`} 
                        alt={activity.type} 
                        className="w-6 h-6" 
                      />
                    </div>
                    <div>
                      <h3 className="text-white capitalize">{activity.type}</h3>
                      <p className="text-sm text-white/50">{activity.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white">{activity.duration}</p>
                    <p className="text-sm text-white/50">{activity.calories} cal</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
