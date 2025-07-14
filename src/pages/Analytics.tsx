
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { getMetrics, getStageData, getTeamPerformance, getDelayAnalysis, mockRFPs } from '../services/mockData';
import { TrendingUp, TrendingDown, DollarSign, Clock, Users, Target, AlertTriangle, CheckCircle, Calendar, Zap } from 'lucide-react';

const Analytics = () => {
  const metrics = getMetrics();
  const stageData = getStageData();
  const teamData = getTeamPerformance();
  const delayData = getDelayAnalysis();

  // Calculate monthly trends
  const monthlyData = [
    { month: 'Jan', rfps: 45, converted: 32, revenue: 480000 },
    { month: 'Feb', rfps: 52, converted: 38, revenue: 570000 },
    { month: 'Mar', rfps: 48, converted: 35, revenue: 525000 },
    { month: 'Apr', rfps: 61, converted: 44, revenue: 660000 },
    { month: 'May', rfps: 55, converted: 41, revenue: 615000 },
    { month: 'Jun', rfps: 58, converted: 43, revenue: 645000 },
  ];

  // Win rate by industry
  const industryData = [
    { industry: 'Manufacturing', winRate: 72, totalValue: 1200000 },
    { industry: 'Technology', winRate: 68, totalValue: 950000 },
    { industry: 'Healthcare', winRate: 65, totalValue: 800000 },
    { industry: 'Finance', winRate: 58, totalValue: 650000 },
    { industry: 'Retail', winRate: 62, totalValue: 750000 },
  ];

  // Process time analysis
  const processTimeData = [
    { stage: 'Quote Generation', avgDays: 2.5, target: 2, performance: 'warning' },
    { stage: 'Client Review', avgDays: 5.2, target: 4, performance: 'poor' },
    { stage: 'Negotiation', avgDays: 3.8, target: 3, performance: 'warning' },
    { stage: 'Contract Signing', avgDays: 1.9, target: 2, performance: 'good' },
    { stage: 'Production', avgDays: 12.5, target: 14, performance: 'good' },
  ];

  // Competitive analysis data
  const competitorData = [
    { quarter: 'Q1', ourWinRate: 68, marketAverage: 62 },
    { quarter: 'Q2', ourWinRate: 71, marketAverage: 64 },
    { quarter: 'Q3', ourWinRate: 69, marketAverage: 63 },
    { quarter: 'Q4', ourWinRate: 73, marketAverage: 65 },
  ];

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'good': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-orange-600 bg-orange-50';
      case 'poor': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPerformanceIcon = (performance: string) => {
    switch (performance) {
      case 'good': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'poor': return AlertTriangle;
      default: return Clock;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Advanced Analytics</h1>
          <p className="text-gray-600">Deep insights into RFP performance, trends, and competitive positioning</p>
        </div>

        {/* KPI Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Win Rate Trend</p>
                <p className="text-2xl font-bold text-green-600">+5.2%</p>
                <p className="text-xs text-gray-500">vs last quarter</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Deal Size</p>
                <p className="text-2xl font-bold text-blue-600">$47.5K</p>
                <p className="text-xs text-green-500">+12% from last month</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Process Efficiency</p>
                <p className="text-2xl font-bold text-purple-600">87%</p>
                <p className="text-xs text-gray-500">meeting SLA targets</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Market Position</p>
                <p className="text-2xl font-bold text-orange-600">#2</p>
                <p className="text-xs text-gray-500">in win rate vs competitors</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue & RFP Volume Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="rfps" fill="#3b82f6" name="RFPs" />
                <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} name="Revenue ($)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Competitive Win Rate Analysis</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={competitorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, 'Win Rate']} />
                <Area type="monotone" dataKey="ourWinRate" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Our Win Rate" />
                <Area type="monotone" dataKey="marketAverage" stackId="2" stroke="#6b7280" fill="#6b7280" fillOpacity={0.3} name="Market Average" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Industry Analysis */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Win Rate by Industry Vertical</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Win Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {industryData.map((industry) => (
                  <tr key={industry.industry} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {industry.industry}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${industry.winRate}%` }}
                          ></div>
                        </div>
                        <span className="font-medium">{industry.winRate}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      ${industry.totalValue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {industry.winRate >= 70 ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Excellent
                        </span>
                      ) : industry.winRate >= 60 ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Good
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <TrendingDown className="w-3 h-3 mr-1" />
                          Needs Focus
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Process Time Analysis */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Process Time Analysis & SLA Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {processTimeData.map((stage) => {
              const Icon = getPerformanceIcon(stage.performance);
              return (
                <div key={stage.stage} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{stage.stage}</h4>
                    <Icon className={`w-5 h-5 ${stage.performance === 'good' ? 'text-green-500' : stage.performance === 'warning' ? 'text-orange-500' : 'text-red-500'}`} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Current Avg:</span>
                      <span className="font-medium">{stage.avgDays} days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Target:</span>
                      <span className="font-medium">{stage.target} days</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          stage.performance === 'good' ? 'bg-green-500' : 
                          stage.performance === 'warning' ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min((stage.target / stage.avgDays) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Insights & Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className="font-semibold text-blue-900 mb-3">Key Insights</h4>
            <ul className="space-y-2 text-blue-700">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-blue-600" />
                Manufacturing sector shows highest win rate at 72%
              </li>
              <li className="flex items-start">
                <TrendingUp className="w-4 h-4 mr-2 mt-0.5 text-blue-600" />
                Q4 competitive positioning improved by 8 percentage points
              </li>
              <li className="flex items-start">
                <Clock className="w-4 h-4 mr-2 mt-0.5 text-blue-600" />
                Client review stage is the biggest bottleneck (5.2 days avg)
              </li>
            </ul>
          </div>
          
          <div className="bg-green-50 rounded-lg p-6">
            <h4 className="font-semibold text-green-900 mb-3">Recommendations</h4>
            <ul className="space-y-2 text-green-700">
              <li className="flex items-start">
                <Target className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                Focus sales efforts on Manufacturing and Technology sectors
              </li>
              <li className="flex items-start">
                <Zap className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                Implement automated follow-up for client review stage
              </li>
              <li className="flex items-start">
                <Users className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                Provide additional training for Finance sector RFPs
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
