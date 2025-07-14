
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { mockRFPs } from '@/services/mockData';
import { useToast } from '@/hooks/use-toast';

export const MetricsExport = () => {
  const { toast } = useToast();

  const generateRFPDataset = () => {
    const dataset = mockRFPs.map(rfp => {
      const submissionDate = new Date(rfp.submissionDate);
      const quotationDate = rfp.quotationDate ? new Date(rfp.quotationDate) : null;
      const orderDate = rfp.orderDate ? new Date(rfp.orderDate) : null;
      const deliveryDate = rfp.deliveryDate ? new Date(rfp.deliveryDate) : null;

      // Calculate time metrics
      const daysToQuote = quotationDate 
        ? Math.ceil((quotationDate.getTime() - submissionDate.getTime()) / (1000 * 60 * 60 * 24))
        : null;
      
      const daysToOrder = orderDate && quotationDate
        ? Math.ceil((orderDate.getTime() - quotationDate.getTime()) / (1000 * 60 * 60 * 24))
        : null;
      
      const daysToDeliver = deliveryDate && orderDate
        ? Math.ceil((deliveryDate.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24))
        : null;
      
      const totalCycleTime = deliveryDate
        ? Math.ceil((deliveryDate.getTime() - submissionDate.getTime()) / (1000 * 60 * 60 * 24))
        : null;

      // Win/Loss analysis
      const isWon = ['Delivered', 'Fulfilled'].includes(rfp.status);
      const isLost = rfp.status === 'Cancelled';
      const isPending = ['Quotation Pending', 'Order Pending', 'In Production'].includes(rfp.status);

      return {
        // Basic RFP Information
        rfp_id: rfp.id,
        client_name: rfp.clientName,
        product_type: rfp.productType,
        assigned_to: rfp.assignedTo,
        current_status: rfp.status,
        
        // Date Information
        submission_date: rfp.submissionDate,
        quotation_date: rfp.quotationDate || 'N/A',
        order_date: rfp.orderDate || 'N/A',
        delivery_date: rfp.deliveryDate || 'N/A',
        
        // Financial Information
        estimated_value: rfp.value || 0,
        actual_value: isWon ? (rfp.value || 0) : 0,
        
        // Time Metrics (in days)
        days_to_quote: daysToQuote || 'N/A',
        days_to_order: daysToOrder || 'N/A',
        days_to_deliver: daysToDeliver || 'N/A',
        total_cycle_time: totalCycleTime || 'N/A',
        
        // Performance Metrics
        is_won: isWon,
        is_lost: isLost,
        is_pending: isPending,
        win_probability: isWon ? 100 : isLost ? 0 : 50,
        
        // Stage Completion
        quote_submitted: !!rfp.quotationDate,
        order_received: !!rfp.orderDate,
        delivery_completed: !!rfp.deliveryDate,
        
        // Quality Metrics
        quote_response_time_category: daysToQuote 
          ? daysToQuote <= 2 ? 'Fast' : daysToQuote <= 5 ? 'Average' : 'Slow'
          : 'N/A',
        delivery_time_category: daysToDeliver
          ? daysToDeliver <= 7 ? 'Fast' : daysToDeliver <= 14 ? 'Average' : 'Slow'
          : 'N/A',
        
        // Additional Analytics Fields
        quarter: `Q${Math.ceil((submissionDate.getMonth() + 1) / 3)} ${submissionDate.getFullYear()}`,
        month: submissionDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        week_of_year: Math.ceil((submissionDate.getTime() - new Date(submissionDate.getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000)),
        
        // Team Performance Indicators
        team_workload: mockRFPs.filter(r => r.assignedTo === rfp.assignedTo).length,
        team_success_rate: Math.round(
          (mockRFPs.filter(r => r.assignedTo === rfp.assignedTo && ['Delivered', 'Fulfilled'].includes(r.status)).length /
          mockRFPs.filter(r => r.assignedTo === rfp.assignedTo).length) * 100
        ),
        
        // Export metadata
        export_date: new Date().toISOString(),
        data_version: '1.0'
      };
    });

    return dataset;
  };

  const exportToCSV = () => {
    const dataset = generateRFPDataset();
    
    if (dataset.length === 0) {
      toast({
        title: "No Data",
        description: "No RFP data available for export.",
        variant: "destructive"
      });
      return;
    }

    // Create CSV headers
    const headers = Object.keys(dataset[0]);
    const csvContent = [
      headers.join(','),
      ...dataset.map(row => 
        headers.map(header => {
          const value = row[header as keyof typeof row];
          // Handle values that might contain commas or quotes
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(',')
      )
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `rfp_metrics_dataset_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    toast({
      title: "Export Successful",
      description: `${dataset.length} RFP records exported successfully.`,
    });
  };

  const exportToJSON = () => {
    const dataset = generateRFPDataset();
    
    const exportData = {
      metadata: {
        export_date: new Date().toISOString(),
        total_records: dataset.length,
        data_version: '1.0',
        description: 'RFP Analytics Dataset - Comprehensive metrics for pipeline analysis'
      },
      summary_metrics: {
        total_rfps: dataset.length,
        won_rfps: dataset.filter(r => r.is_won).length,
        lost_rfps: dataset.filter(r => r.is_lost).length,
        pending_rfps: dataset.filter(r => r.is_pending).length,
        total_value: dataset.reduce((sum, r) => sum + r.estimated_value, 0),
        won_value: dataset.reduce((sum, r) => sum + r.actual_value, 0),
        average_cycle_time: Math.round(
          dataset.filter(r => typeof r.total_cycle_time === 'number')
            .reduce((sum, r) => sum + (r.total_cycle_time as number), 0) /
          dataset.filter(r => typeof r.total_cycle_time === 'number').length
        ) || 0
      },
      rfp_data: dataset
    };

    const jsonContent = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `rfp_analytics_${new Date().toISOString().split('T')[0]}.json`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    toast({
      title: "JSON Export Successful",
      description: `Complete analytics dataset exported with ${dataset.length} records.`,
    });
  };

  return (
    <div className="flex gap-2">
      <Button onClick={exportToCSV} variant="outline" size="sm">
        <Download className="h-4 w-4 mr-2" />
        Export CSV
      </Button>
      <Button onClick={exportToJSON} variant="outline" size="sm">
        <Download className="h-4 w-4 mr-2" />
        Export JSON
      </Button>
    </div>
  );
};
