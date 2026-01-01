import React, { useState, useEffect } from 'react';
import { User, Mail, Key, Hash, Camera } from 'lucide-react';
import axios from 'axios';
import config from '../../config';

export const Profile = () => {
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    id: storedUser.id || '',
    name: storedUser.name || '',
    email: storedUser.email || '',
    rollNumber: storedUser.rollNumber || '',
    avatar: storedUser.avatar || '',
    joinedDate: storedUser.joinedDate || '',
    totalOrders: storedUser.totalOrders || 0,
  });
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log(localStorage.getItem('token'));
        const response = await axios.get(`${config.apiBaseUrl}/users/profile`, {
          headers: {
            
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);

    try {
      const updatedProfile = {
        name: profile.name,
        email: profile.email,
        rollNumber: profile.rollNumber,
        ...(newPassword && { password: newPassword }),
      };
      console.log(updatedProfile);
      const response = await axios.put(`${config.apiBaseUrl}/users/profile`, updatedProfile, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(response);
      setProfile(response.data);
      setNewPassword('');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="glass-card rounded-lg overflow-hidden">
        <div className="relative h-48 bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="absolute -bottom-16 left-8">
            <div className="relative">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-32 h-32 rounded-full border-4 border-black object-cover"
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 rounded-full text-white hover:bg-indigo-700">
                  <Camera className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="pt-20 pb-8 px-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
              <p className="text-gray-400">Member since {new Date(profile.joinedDate).toLocaleDateString()}</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              // onClick={() => updateUser(profilefunc)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-gray-300 mb-2">
                  <User className="h-5 w-5 mr-2" />
                  Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-50"
                />
              </div>

              <div>
                <label className="flex items-center text-gray-300 mb-2">
                  <Mail className="h-5 w-5 mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-50"
                />
              </div>

              <div>
                <label className="flex items-center text-gray-300 mb-2">
                  <Hash className="h-5 w-5 mr-2" />
                  Roll Number
                </label>
                <input
                  type="text"
                  value={profile.rollNumber}
                  onChange={(e) => setProfile({ ...profile, rollNumber: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-50"
                />
              </div>

              {isEditing && (
                <div>
                  <label className="flex items-center text-gray-300 mb-2">
                    <Key className="h-5 w-5 mr-2" />
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
              )}
            </div>

            {isEditing && (
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>

          <div className="mt-8 pt-8 border-t border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Account Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-4 rounded-lg">
                <p className="text-gray-400">Total Orders</p>
                <p className="text-2xl font-bold text-indigo-400">{profile.totalOrders}</p>
              </div>
              <div className="glass-card p-4 rounded-lg">
                <p className="text-gray-400">Member For</p>
                <p className="text-2xl font-bold text-indigo-400">
                  {Math.floor((new Date().getTime() - new Date(profile.joinedDate).getTime()) / (1000 * 60 * 60 * 24))} days
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};