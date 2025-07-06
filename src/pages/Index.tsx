import React, { useState } from 'react';
import { Target, Crown, TrendingUp, User, Plus, MessageCircle, Calendar, Edit3, X } from 'lucide-react';

const MySavingApp = () => {
  const [currentScreen, setCurrentScreen] = useState('goals');
  const [goals, setGoals] = useState([]);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [showAddSaving, setShowAddSaving] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: '',
    target: '',
    duration: '',
    endDate: '',
    reminder: '1st of every month'
  });

  const screens = {
    goals: 'Goal',
    pricing: 'Pricing',
    analytics: 'Matrix',
    profile: 'Profile'
  };

  const calculateProgress = (saved, target) => {
    return Math.round((saved / target) * 100);
  };

  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString()}`;
  };

  const addGoal = () => {
    if (newGoal.name && newGoal.target) {
      const goal = {
        id: Date.now(),
        name: newGoal.name,
        target: parseInt(newGoal.target),
        saved: 0,
        duration: parseInt(newGoal.duration),
        endDate: newGoal.endDate,
        reminder: newGoal.reminder,
        savings: []
      };
      setGoals([...goals, goal]);
      setNewGoal({ name: '', target: '', duration: '', endDate: '', reminder: '1st of every month' });
      setShowAddGoal(false);
    }
  };

  const addSaving = (goalId, amount, date, description) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, saved: goal.saved + amount, savings: [...goal.savings, { amount, date, description }] }
        : goal
    ));
    setShowAddSaving(false);
  };

  const AuthScreen = () => (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
            <div className="w-10 h-8 bg-lime-400 rounded-sm relative">
              <div className="absolute top-1 right-1 w-2 h-2 bg-lime-600 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 border-2 border-lime-400 rounded-lg p-6 space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full bg-gray-300 text-black placeholder-gray-600 px-4 py-3 rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-gray-300 text-black placeholder-gray-600 px-4 py-3 rounded-lg"
          />
          <input
            type="tel"
            placeholder="Phone No"
            className="w-full bg-gray-300 text-black placeholder-gray-600 px-4 py-3 rounded-lg"
          />
          <button
            onClick={() => setIsAuthenticated(true)}
            className="w-full bg-lime-400 text-black font-semibold py-3 rounded-lg hover:bg-lime-500 transition-colors"
          >
            Sign Up
          </button>
          <button
            onClick={() => setIsAuthenticated(true)}
            className="w-full bg-lime-400 text-black font-semibold py-3 rounded-lg hover:bg-lime-500 transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );

  const ChatOverlay = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-gray-800 w-full max-w-md mx-auto rounded-t-3xl p-6 max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white text-lg font-semibold">AI Chat</h3>
          <button onClick={() => setShowChat(false)} className="text-gray-400">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <div className="bg-gray-700 rounded-lg p-3 max-w-xs">
            <p className="text-white text-sm">Hi, this is ai chat of mysavings. How can I help you?</p>
          </div>
          <div className="bg-lime-400 rounded-lg p-3 max-w-xs ml-auto">
            <p className="text-black text-sm">I want your help to save my money to buy an car.</p>
          </div>
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-l-lg"
          />
          <button className="bg-lime-400 text-black px-4 py-2 rounded-r-lg">Send</button>
        </div>
      </div>
    </div>
  );

  const Header = () => (
    <div className="flex justify-between items-center p-4 bg-gray-900">
      <div className="bg-gray-800 text-white px-4 py-2 rounded-lg">
        <span className="text-sm">Plan your savings...</span>
      </div>
      <button
        onClick={() => setShowChat(true)}
        className="bg-lime-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-lime-500 transition-colors"
      >
        Ask AI
      </button>
    </div>
  );

  const AddGoalModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-lime-400 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-black text-2xl font-bold mb-4">Add New Goal</h2>
        <div className="space-y-4">
          <div>
            <label className="text-black font-semibold block mb-2">Goal Name*</label>
            <input
              type="text"
              placeholder="e.g., Buy A Car, New Laptop"
              value={newGoal.name}
              onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg"
            />
          </div>
          <div>
            <label className="text-black font-semibold block mb-2">Target Amount (₹)*</label>
            <input
              type="number"
              placeholder="50,000"
              value={newGoal.target}
              onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg"
            />
          </div>
          <div>
            <label className="text-black font-semibold block mb-2">Duration (Months)*</label>
            <input
              type="number"
              placeholder="24"
              value={newGoal.duration}
              onChange={(e) => setNewGoal({ ...newGoal, duration: e.target.value })}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg"
            />
          </div>
          <div>
            <label className="text-black font-semibold block mb-2">End Date*</label>
            <input
              type="text"
              placeholder="30 Jun 2025"
              value={newGoal.endDate}
              onChange={(e) => setNewGoal({ ...newGoal, endDate: e.target.value })}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg"
            />
          </div>
          <div>
            <label className="text-black font-semibold block mb-2">Monthly Reminder Date*</label>
            <select
              value={newGoal.reminder}
              onChange={(e) => setNewGoal({ ...newGoal, reminder: e.target.value })}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg"
            >
              <option>1st of every month</option>
              <option>15th of every month</option>
              <option>Last day of every month</option>
            </select>
          </div>
          <div className="flex space-x-4 mt-6">
            <button
              onClick={() => setShowAddGoal(false)}
              className="flex-1 bg-transparent border-2 border-black text-black font-semibold py-3 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={addGoal}
              className="flex-1 bg-black text-lime-400 font-semibold py-3 rounded-lg"
            >
              Create Goal
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const GoalDetailModal = ({ goal }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-lime-400 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-black text-2xl font-bold">{goal.name}</h2>
          <button onClick={() => setSelectedGoal(null)} className="text-black">
            <X size={24} />
          </button>
        </div>
        <div className="flex border-b-2 border-black mb-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-4 font-semibold ${activeTab === 'overview' ? 'border-b-2 border-black text-black' : 'text-gray-700'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`py-2 px-4 font-semibold ${activeTab === 'add' ? 'border-b-2 border-black text-black' : 'text-gray-700'}`}
          >
            Add Saving
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`py-2 px-4 font-semibold ${activeTab === 'history' ? 'border-b-2 border-black text-black' : 'text-gray-700'}`}
          >
            History
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-black text-6xl font-bold">{calculateProgress(goal.saved, goal.target)}%</div>
              <div className="bg-black text-lime-400 px-4 py-2 rounded-lg text-center">
                <div className="text-sm">Total Saved</div>
                <div className="font-bold">{formatCurrency(goal.saved)}</div>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="bg-gray-800 text-white px-4 py-2 rounded-lg text-center flex-1">
                <div className="text-2xl font-bold">{goal.duration}</div>
                <div className="text-sm">Month Duration</div>
              </div>
              <div className="bg-gray-800 text-white px-4 py-2 rounded-lg text-center flex-1">
                <div className="text-2xl font-bold">{formatCurrency(goal.target)}</div>
                <div className="text-sm">Overall Progress</div>
              </div>
            </div>
            <div className="bg-transparent border-2 border-black rounded-lg p-4">
              <div className="text-black font-semibold">Congratulations!</div>
              <div className="text-black text-xl font-bold">{calculateProgress(goal.saved, goal.target)}% Goal Achieved</div>
            </div>
          </div>
        )}

        {activeTab === 'add' && (
          <div className="space-y-4">
            <div>
              <label className="text-black font-semibold block mb-2">Amount to Add (₹)*</label>
              <input
                type="number"
                placeholder="5000"
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg"
              />
            </div>
            <div>
              <label className="text-black font-semibold block mb-2">Date</label>
              <input
                type="text"
                placeholder="30 Jan 2025"
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg"
              />
            </div>
            <div>
              <label className="text-black font-semibold block mb-2">Description (Optional)</label>
              <input
                type="text"
                placeholder="e.g., Salary savings, Bonus money"
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg"
              />
            </div>
            <button
              onClick={() => {
                addSaving(goal.id, 5000, '30 Jan 2025', 'Salary savings');
                setActiveTab('overview');
              }}
              className="w-full bg-black text-lime-400 font-semibold py-3 rounded-lg"
            >
              Add Saving
            </button>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            {goal.savings.length > 0 ? (
              goal.savings.map((saving, index) => (
                <div key={index} className="bg-gray-800 text-white p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <div className="font-bold">{formatCurrency(saving.amount)}</div>
                    <div className="text-sm text-gray-400">{saving.date}</div>
                  </div>
                  <button className="text-lime-400">
                    <Edit3 size={16} />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-700 py-8">
                <p>No savings history yet</p>
                <p className="text-sm">Add your first saving to see history</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const GoalsScreen = () => (
    <div className="bg-black min-h-screen">
      <Header />
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lime-400 text-2xl font-bold">My Goals</h1>
          <button
            onClick={() => setShowAddGoal(true)}
            className="bg-lime-400 text-black w-12 h-12 rounded-full flex items-center justify-center hover:bg-lime-500 transition-colors"
          >
            <Plus size={24} />
          </button>
        </div>

        {goals.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-32 h-40 mx-auto mb-6 bg-gray-600 rounded-lg flex items-center justify-center">
              <div className="text-white text-xl">Empty</div>
            </div>
            <div className="text-white text-xl font-semibold mb-2">No Goals Yet</div>
            <div className="text-gray-400 mb-8">Create your first saving goal to get started!</div>
            <button
              onClick={() => setShowAddGoal(true)}
              className="bg-lime-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-lime-500 transition-colors"
            >
              Create Your First Goal
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {goals.map((goal, index) => (
              <div
                key={goal.id}
                onClick={() => setSelectedGoal(goal)}
                className="bg-lime-400 rounded-lg p-4 cursor-pointer hover:bg-lime-500 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-black text-xl font-bold">{index + 1}.</div>
                  <div className="text-right">
                    <div className="text-black font-semibold">Progress</div>
                    <div className="text-black text-2xl font-bold">{calculateProgress(goal.saved, goal.target)}%</div>
                  </div>
                </div>
                <div className="text-black text-xl font-bold mb-2">{goal.name}</div>
                <div className="w-full bg-gray-800 h-2 rounded-full mb-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${calculateProgress(goal.saved, goal.target)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-black">
                  <div>
                    <div className="font-semibold">Saved: {formatCurrency(goal.saved)}</div>
                    <div className="font-semibold">Target: {formatCurrency(goal.target)}</div>
                  </div>
                </div>
                <div className="mt-4 bg-transparent border-2 border-black rounded-lg p-2">
                  <div className="text-black font-semibold">Congratulations!</div>
                  <div className="text-black font-bold">{calculateProgress(goal.saved, goal.target)}% Goal Achieved</div>
                </div>
                <div className="mt-2 text-black text-sm">
                  Reminder: {goal.reminder}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const PricingScreen = () => (
    <div className="bg-black min-h-screen">
      <Header />
      <div className="p-4">
        <h1 className="text-lime-400 text-2xl font-bold mb-6">Upgrade to Pro</h1>
        <div className="bg-lime-400 rounded-lg p-6 border-2 border-lime-400">
          <div className="text-center mb-6">
            <div className="text-6xl mb-2">👑</div>
            <div className="text-black text-2xl font-bold">Pro Plan</div>
            <div className="text-black text-3xl font-bold">₹299<span className="text-lg font-normal">/month</span></div>
            <div className="text-gray-700 text-sm">Billed monthly via Stripe</div>
          </div>
          <div className="space-y-3 mb-6">
            {[
              'Unlimited savings goals',
              'Push notifications & reminders',
              'Set custom reminder dates',
              'Premium analytics & insights',
              'Priority support',
              'AI Gemini advanced tips'
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="text-black text-xl">✓</div>
                <span className="text-black">{feature}</span>
              </div>
            ))}
          </div>
          <button className="w-full bg-black text-lime-400 font-semibold py-3 rounded-lg hover:bg-gray-800 transition-colors">
            Upgrade Now
          </button>
          <div className="text-center mt-4 text-gray-700">
            Current Plan: <span className="font-bold">FREE</span>
          </div>
        </div>
      </div>
    </div>
  );

  const AnalyticsScreen = () => (
    <div className="bg-black min-h-screen">
      <Header />
      <div className="p-4">
        <h1 className="text-lime-400 text-2xl font-bold mb-6">Analytics</h1>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-lime-400 text-2xl font-bold">₹0</div>
            <div className="text-white text-sm">Total Saved</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-lime-400 text-2xl font-bold">₹0</div>
            <div className="text-white text-sm">Overall Progress</div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <div className="text-white text-xl font-bold mb-2">Goals Progress</div>
          <div className="text-gray-400">No Active Goals to Analyze</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-white text-xl font-bold mb-2">Insights</div>
          <div className="text-gray-400">You have 0 active goals</div>
        </div>
      </div>
    </div>
  );

  const GuideScreen = () => (
    <div className="bg-black min-h-screen">
      <Header />
      <div className="p-4">
        <h1 className="text-lime-400 text-2xl font-bold mb-6">Guide</h1>
        <div className="space-y-6">
          <div>
            <h2 className="text-white text-xl font-bold mb-2">What is mysaving app?</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </div>
          <div>
            <h2 className="text-white text-xl font-bold">Why do you use it?</h2>
          </div>
          <div>
            <h2 className="text-white text-xl font-bold">How does it help you?</h2>
          </div>
          <div>
            <h2 className="text-white text-xl font-bold">How to create goal?</h2>
          </div>
          <div>
            <h2 className="text-white text-xl font-bold">Why pricing is so high?</h2>
          </div>
        </div>
      </div>
    </div>
  );

  const ProfileScreen = () => (
    <div className="bg-black min-h-screen">
      <Header />
      <div className="p-4">
        <h1 className="text-lime-400 text-2xl font-bold mb-6">Profile</h1>
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <div className="text-white text-xl font-bold mb-2">User</div>
            <div className="text-gray-400 text-sm">hm.gaurav2001@gmail.com</div>
          </div>
        </div>
        <div className="space-y-4">
          <button className="w-full bg-lime-400 text-black font-semibold py-3 rounded-lg hover:bg-lime-500 transition-colors">
            Upgrade to Pro
          </button>
          <button
            onClick={() => setCurrentScreen('guide')}
            className="w-full bg-gray-800 text-white font-semibold py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Guide & Tips
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
        <div className="text-center mt-8 text-gray-500 text-sm">
          Ai Powered Saving Manager
        </div>
      </div>
    </div>
  );

  const BottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700">
      <div className="flex">
        {Object.entries(screens).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setCurrentScreen(key)}
            className={`flex-1 py-4 flex flex-col items-center ${
              currentScreen === key ? 'text-lime-400' : 'text-gray-400'
            }`}
          >
            {key === 'goals' && <Target size={24} />}
            {key === 'pricing' && <Crown size={24} />}
            {key === 'analytics' && <TrendingUp size={24} />}
            {key === 'profile' && <User size={24} />}
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  return (
    <div className="bg-black min-h-screen pb-20">
      {currentScreen === 'goals' && <GoalsScreen />}
      {currentScreen === 'pricing' && <PricingScreen />}
      {currentScreen === 'analytics' && <AnalyticsScreen />}
      {currentScreen === 'profile' && <ProfileScreen />}
      {currentScreen === 'guide' && <GuideScreen />}
      
      <BottomNav />
      
      {showAddGoal && <AddGoalModal />}
      {selectedGoal && <GoalDetailModal goal={selectedGoal} />}
      {showChat && <ChatOverlay />}
    </div>
  );
};

export default MySavingApp;