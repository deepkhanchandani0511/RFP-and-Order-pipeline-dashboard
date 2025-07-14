import { useState } from 'react';
import { mockRFPs, RFP } from '../services/mockData';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import { MetricsExport } from '@/components/RFPMetrics/MetricsExport';

const Pipeline = () => {
  const [rfps, setRfps] = useState<RFP[]>(mockRFPs);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [teamFilter, setTeamFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Quotation Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Order Pending': return 'bg-blue-100 text-blue-800';
      case 'In Production': return 'bg-purple-100 text-purple-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Fulfilled': return 'bg-green-200 text-green-900';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRFPs = rfps.filter(rfp => {
    const matchesSearch = rfp.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rfp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rfp.productType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || rfp.status === statusFilter;
    const matchesTeam = teamFilter === 'all' || rfp.assignedTo === teamFilter;
    
    return matchesSearch && matchesStatus && matchesTeam;
  });

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (value?: number) => {
    if (!value) return '-';
    return `$${value.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">RFP Pipeline</h1>
            <MetricsExport />
          </div>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search RFPs, clients, or products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Quotation Pending">Quotation Pending</SelectItem>
                <SelectItem value="Order Pending">Order Pending</SelectItem>
                <SelectItem value="In Production">In Production</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Fulfilled">Fulfilled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={teamFilter} onValueChange={setTeamFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                <SelectItem value="Sales_A">Sales_A</SelectItem>
                <SelectItem value="Sales_B">Sales_B</SelectItem>
                <SelectItem value="Sales_C">Sales_C</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* RFP Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    RFP ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submission
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quotation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delivery
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Team
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRFPs.map((rfp) => (
                  <tr key={rfp.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {rfp.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {rfp.clientName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {rfp.productType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(rfp.submissionDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(rfp.quotationDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(rfp.orderDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(rfp.deliveryDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={getStatusColor(rfp.status)}>
                        {rfp.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {formatCurrency(rfp.value)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {rfp.assignedTo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium text-gray-900">Showing Results</h3>
            <p className="text-2xl font-bold text-blue-600">{filteredRFPs.length}</p>
            <p className="text-sm text-gray-500">of {mockRFPs.length} total RFPs</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium text-gray-900">Total Value</h3>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(filteredRFPs.reduce((sum, rfp) => sum + (rfp.value || 0), 0))}
            </p>
            <p className="text-sm text-gray-500">in filtered results</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium text-gray-900">Conversion Rate</h3>
            <p className="text-2xl font-bold text-purple-600">
              {filteredRFPs.length > 0 ? Math.round((filteredRFPs.filter(rfp => rfp.orderDate).length / filteredRFPs.length) * 100) : 0}%
            </p>
            <p className="text-sm text-gray-500">for filtered RFPs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pipeline;
