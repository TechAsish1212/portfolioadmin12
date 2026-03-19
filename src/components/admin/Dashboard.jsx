import React from 'react';
import {
  FolderKanban,
  Code2,
  GraduationCap,
  Quote,
  TrendingUp,
  Users,
  Eye,
  Star,
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const Dashboard = () => {
  const { portfolioProjects, skills, educationList, quotes } = useAdmin();

  const stats = [
    {
      title: 'Total Projects',
      value: portfolioProjects.length,
      icon: FolderKanban,
      color: 'from-blue-500 to-blue-600',
      lightColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-100',
    },
    {
      title: 'Skill Categories',
      value: skills.length,
      icon: Code2,
      color: 'from-emerald-500 to-emerald-600',
      lightColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      borderColor: 'border-emerald-100',
    },
    {
      title: 'Education',
      value: educationList.length,
      icon: GraduationCap,
      color: 'from-purple-500 to-purple-600',
      lightColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-100',
    },
    {
      title: 'Inspiring Quotes',
      value: quotes.length,
      icon: Quote,
      color: 'from-amber-500 to-amber-600',
      lightColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
      borderColor: 'border-amber-100',
    },
  ];

  const recentProjects = portfolioProjects.slice(-3).reverse();

  // Get current time greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header with Greeting */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {getGreeting()}, Asish kumar Bera <span className="wave">👋</span>
            </h1>
            <p className="text-gray-600 flex items-center gap-2">
              <Clock size={16} className="text-gray-400" />
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm flex items-center gap-2">
            <Sparkles size={20} className="text-yellow-500" />
            <span className="text-gray-700 font-medium">Portfolio Dashboard</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
          >
            <div className={`h-2 bg-gradient-to-r ${stat.color}`} />
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.lightColor} p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`${stat.iconColor}`} size={28} />
                </div>
              </div>
              
              {/* Mini trend indicator */}
              <div className="mt-4 flex items-center gap-2">
                <TrendingUp size={16} className="text-green-500" />
                <span className="text-xs text-gray-500">Updated just now</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects - Takes 2 columns on large screens */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <FolderKanban className="text-blue-600" size={24} />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Recent Projects</h2>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 group">
                View all
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="space-y-4">
              {recentProjects.length > 0 ? (
                recentProjects.map((project, index) => (
                  <div
                    key={project.id || index}
                    className="group flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 border border-transparent hover:border-gray-200"
                  >
                    {/* Project Image with overlay */}
                    <div className="relative flex-shrink-0">
                      <div className="w-20 h-20 rounded-lg overflow-hidden shadow-md">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                        #{index + 1}
                      </div>
                    </div>
                    
                    {/* Project Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {project.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.tags?.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md hover:bg-gray-200 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags?.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                            +{project.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <FolderKanban className="mx-auto text-gray-300 mb-3" size={48} />
                  <p className="text-gray-500">No projects yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Quick Stats */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-50 p-2 rounded-lg">
                <Star className="text-purple-600" size={24} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Quick Stats</h2>
            </div>

            <div className="space-y-4">
              {/* Skills Distribution */}
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Skills Overview</span>
                  <span className="text-xs text-purple-600 bg-white px-2 py-1 rounded-full">
                    {skills.length} categories
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Code2 size={20} className="text-purple-500" />
                  <div className="flex-1 h-2 bg-purple-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
                      style={{ width: `${Math.min((skills.length / 10) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Education Stats */}
              <div className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Education</span>
                  <span className="text-xs text-emerald-600 bg-white px-2 py-1 rounded-full">
                    {educationList.length} records
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap size={20} className="text-emerald-500" />
                  <div className="flex-1 h-2 bg-emerald-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"
                      style={{ width: `${Math.min((educationList.length / 5) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Quotes Stats */}
              <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Quotes</span>
                  <span className="text-xs text-amber-600 bg-white px-2 py-1 rounded-full">
                    {quotes.length} quotes
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Quote size={20} className="text-amber-500" />
                  <div className="flex-1 h-2 bg-amber-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                      style={{ width: `${Math.min((quotes.length / 20) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Random Quote of the Day */}
              {quotes.length > 0 && (
                <div className="mt-6 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                  <div className="flex items-start gap-3">
                    <Quote size={20} className="text-gray-400 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600 italic">
                        "{quotes[Math.floor(Math.random() * quotes.length)]?.text || "No quotes available"}"
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        — {quotes[Math.floor(Math.random() * quotes.length)]?.author || "Unknown"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Activity Summary */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Eye size={16} className="text-gray-400" />
                <span>Last updated: Just now</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                <Users size={16} className="text-gray-400" />
                <span>Total items: {portfolioProjects.length + skills.length + educationList.length + quotes.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add wave animation */}
      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          75% { transform: rotate(10deg); }
        }
        .wave {
          display: inline-block;
          animation: wave 2s infinite;
          transform-origin: 70% 70%;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;