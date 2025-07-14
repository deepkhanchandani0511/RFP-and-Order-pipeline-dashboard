
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { getTeamPerformance, mockRFPs, getDelayAnalysis } from '../services/mockData';
import { Users, Target, DollarSign, Clock, TrendingUp } from 'lucide-react';

const Team = () => {
  const teamData = getTeamPerformance();
  const delayData = getDelayAnalysis();

  // Calculate team-specific delay metrics
  const teamDelayMetrics = teamData.map(team => {
    const teamDelays = delayData.filter(delay => {
      const rfp = mockRFPs.find(r => r.id === delay.id);
      return rfp?.assignedTo === team.name;
    });
    
    const avgQuoteTime = teamDelays.length > 0 
      ? teamDelays.reduce((sum, delay) => sum + delay.daysToQuote, 0) / teamDelays.length 
      : 0;
    
    return {
      ...team,
      avgQuoteTime: Math.round(avgQuoteTime * 10) / 10
    };
  });

  const getPerformanceColor = (rate: number) => {
    if (rate >= 70) return 'text-green-600 bg-green-50';
    if (rate >= 50) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Team Performance</h1>
          <p className="text-gray-600">Track individual team member performance across RFP processing</p>
        </div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {teamDelayMetrics.map((team) => (
            <div key={team.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{team.name}</h3>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total RFPs</span>
                  <span className="font-semibold">{team.totalRFPs}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Converted</span>
                  <span className="font-semibold">{team.converted}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Conversion Rate</span>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${getPerformanceColor(team.conversionRate)}`}>
                    {team.conversionRate}%
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Value</span>
                  <span className="font-semibold text-green-600">${team.totalValue.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Avg Quote Time</span>
                  <span className="font-semibold text-blue-600">{team.avgQuoteTime} days</span>
                </div>
              </div>
              
              {/* Progress Bar for Conversion Rate */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${team.conversionRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Conversion Rate Comparison */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Rate Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={teamData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, 'Conversion Rate']} />
                <Bar dataKey="conversionRate" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Total Value by Team */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Generated</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={teamData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Total Value']} />
                <Bar dataKey="totalValue" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Performance Table */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Performance Metrics</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Team Member
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total RFPs
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Converted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conversion Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg Quote Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {teamDelayMetrics.map((team) => (
                  <tr key={team.name} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {team.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {team.totalRFPs}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {team.converted}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {team.conversionRate}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      ${team.totalValue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                      {team.avgQuoteTime} days
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {team.conversionRate >= 70 ? (
                          <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                        ) : team.conversionRate >= 50 ? (
                          <Target className="h-5 w-5 text-yellow-500 mr-2" />
                        ) : (
                          <Clock className="h-5 w-5 text-red-500 mr-2" />
                        )}
                        <span className={`text-sm font-medium ${
                          team.conversionRate >= 70 ? 'text-green-600' :
                          team.conversionRate >= 50 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {team.conversionRate >= 70 ? 'Excellent' :
                           team.conversionRate >= 50 ? 'Good' : 'Needs Improvement'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className="font-semibold text-blue-900 mb-2">Top Performer</h4>
            <p className="text-blue-700">
              {teamData.reduce((top, current) => 
                current.conversionRate > top.conversionRate ? current : top
              ).name} leads with {teamData.reduce((top, current) => 
                current.conversionRate > top.conversionRate ? current : top
              ).conversionRate}% conversion rate
            </p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-6">
            <h4 className="font-semibold text-green-900 mb-2">Revenue Leader</h4>
            <p className="text-green-700">
              {teamData.reduce((top, current) => 
                current.totalValue > top.totalValue ? current : top
              ).name} generated ${teamData.reduce((top, current) => 
                current.totalValue > top.totalValue ? current : top
              ).totalValue.toLocaleString()} in total revenue
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
