import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../../components/Logo/Logo';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const { connectWallet, connectFitnessTracker } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle traditional email/password auth
    console.log('Auth form submitted', { email, password });
  };

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    try {
      await connectWallet();
      navigate('/dashboard');
    } catch (error) {
      console.error('Error connecting wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleConnectFitness = async (provider: string) => {
    setIsConnecting(true);
    try {
      await connectFitnessTracker(provider);
    } catch (error) {
      console.error(`Error connecting ${provider}:`, error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md border border-white/20 relative"
      >
        <button onClick={() => navigate('/')} className="absolute left-4 top-4 text-white/70 hover:text-white text-sm">← Back to Home</button>
        <div className="flex flex-col items-center mb-6">
          <Logo style={{ width: 56, height: 56, marginBottom: 8 }} />
          <h2 className="text-3xl font-bold text-white mb-2 text-center">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-white/60 text-center text-sm mb-2">
            {isLogin ? 'Login to access your fitness dashboard and start earning tokens.' : 'Sign up to join the fitness revolution and earn crypto for staying active!'}
          </p>
        </div>
        
        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <span className="text-xs text-white/50">We'll never share your email.</span>
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <span className="text-xs text-white/50">Minimum 8 characters.</span>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-lg"
            disabled={isConnecting}
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-transparent text-white/70">Or continue with</span>
          </div>
        </div>

        {/* Wallet Connection */}
        <div className="space-y-4">
          <button
            onClick={handleConnectWallet}
            disabled={isConnecting}
            className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            <img src="/metamask.svg" alt="MetaMask" className="w-6 h-6" />
            {isConnecting ? 'Connecting...' : 'Connect with MetaMask'}
          </button>

          <div className="grid grid-cols-3 gap-3 mt-6">
            {['Fitbit', 'Google Fit', 'Apple Health'].map((provider) => (
              <button
                key={provider}
                onClick={() => handleConnectFitness(provider)}
                disabled={isConnecting}
                className="flex flex-col items-center justify-center p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors disabled:opacity-50"
              >
                <img 
                  src={`/${provider.toLowerCase().replace(' ', '-')}.svg`} 
                  alt={provider} 
                  className="w-8 h-8 mb-2"
                />
                <span className="text-xs text-white/70">{provider}</span>
              </button>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-white/70">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-300 hover:text-white font-medium"
          >
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
