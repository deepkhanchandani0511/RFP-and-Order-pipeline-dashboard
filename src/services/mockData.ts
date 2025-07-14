
export interface RFP {
  id: string;
  clientName: string;
  productType: string;
  submissionDate: string;
  quotationDate?: string;
  orderDate?: string;
  deliveryDate?: string;
  status: 'Quotation Pending' | 'Order Pending' | 'In Production' | 'Delivered' | 'Fulfilled' | 'Cancelled';
  value?: number;
  assignedTo: string;
}

export const mockRFPs: RFP[] = [
  {
    id: 'RFP001',
    clientName: 'ABC Corp',
    productType: 'Gears',
    submissionDate: '2024-10-01',
    quotationDate: '2024-10-03',
    orderDate: '2024-10-06',
    deliveryDate: '2024-10-12',
    status: 'Fulfilled',
    value: 15000,
    assignedTo: 'Sales_A'
  },
  {
    id: 'RFP002',
    clientName: 'Delta Inc',
    productType: 'Bearings',
    submissionDate: '2024-10-02',
    status: 'Quotation Pending',
    assignedTo: 'Sales_B'
  },
  {
    id: 'RFP003',
    clientName: 'Tech Solutions',
    productType: 'Motors',
    submissionDate: '2024-09-28',
    quotationDate: '2024-09-30',
    orderDate: '2024-10-04',
    status: 'In Production',
    value: 25000,
    assignedTo: 'Sales_A'
  },
  {
    id: 'RFP004',
    clientName: 'Global Manufacturing',
    productType: 'Pumps',
    submissionDate: '2024-09-25',
    quotationDate: '2024-09-27',
    orderDate: '2024-10-01',
    deliveryDate: '2024-10-08',
    status: 'Delivered',
    value: 35000,
    assignedTo: 'Sales_C'
  },
  {
    id: 'RFP005',
    clientName: 'Innovation Labs',
    productType: 'Sensors',
    submissionDate: '2024-10-05',
    quotationDate: '2024-10-07',
    status: 'Order Pending',
    value: 8000,
    assignedTo: 'Sales_B'
  },
  {
    id: 'RFP006',
    clientName: 'MegaCorp Industries',
    productType: 'Valves',
    submissionDate: '2024-09-20',
    quotationDate: '2024-09-22',
    orderDate: '2024-09-26',
    deliveryDate: '2024-10-03',
    status: 'Fulfilled',
    value: 42000,
    assignedTo: 'Sales_A'
  },
  {
    id: 'RFP007',
    clientName: 'Smart Systems',
    productType: 'Controllers',
    submissionDate: '2024-10-08',
    status: 'Quotation Pending',
    assignedTo: 'Sales_C'
  },
  {
    id: 'RFP008',
    clientName: 'Precision Parts Co',
    productType: 'Gears',
    submissionDate: '2024-09-30',
    quotationDate: '2024-10-02',
    orderDate: '2024-10-05',
    status: 'In Production',
    value: 18000,
    assignedTo: 'Sales_B'
  }
];

export const getMetrics = () => {
  const totalRFPs = mockRFPs.length;
  const quotationsPending = mockRFPs.filter(rfp => rfp.status === 'Quotation Pending').length;
  const ordersReceived = mockRFPs.filter(rfp => rfp.orderDate).length;
  const delivered = mockRFPs.filter(rfp => rfp.status === 'Delivered' || rfp.status === 'Fulfilled').length;
  const totalValue = mockRFPs.reduce((sum, rfp) => sum + (rfp.value || 0), 0);
  
  return {
    totalRFPs,
    quotationsPending,
    ordersReceived,
    delivered,
    totalValue,
    conversionRate: totalRFPs > 0 ? Math.round((ordersReceived / totalRFPs) * 100) : 0
  };
};

export const getStageData = () => {
  const stages = [
    { name: 'RFP Submitted', count: mockRFPs.length },
    { name: 'Quotation Sent', count: mockRFPs.filter(rfp => rfp.quotationDate).length },
    { name: 'Order Received', count: mockRFPs.filter(rfp => rfp.orderDate).length },
    { name: 'Delivered', count: mockRFPs.filter(rfp => rfp.status === 'Delivered' || rfp.status === 'Fulfilled').length }
  ];
  
  return stages;
};

export const getTeamPerformance = () => {
  const teams = ['Sales_A', 'Sales_B', 'Sales_C'];
  return teams.map(team => {
    const teamRFPs = mockRFPs.filter(rfp => rfp.assignedTo === team);
    const converted = teamRFPs.filter(rfp => rfp.orderDate).length;
    const totalValue = teamRFPs.reduce((sum, rfp) => sum + (rfp.value || 0), 0);
    
    return {
      name: team,
      totalRFPs: teamRFPs.length,
      converted,
      conversionRate: teamRFPs.length > 0 ? Math.round((converted / teamRFPs.length) * 100) : 0,
      totalValue
    };
  });
};

export const getDelayAnalysis = () => {
  const delays = mockRFPs.filter(rfp => rfp.quotationDate).map(rfp => {
    const submissionDate = new Date(rfp.submissionDate);
    const quotationDate = new Date(rfp.quotationDate!);
    const daysToQuote = Math.ceil((quotationDate.getTime() - submissionDate.getTime()) / (1000 * 60 * 60 * 24));
    
    let daysToDeliver = null;
    if (rfp.deliveryDate && rfp.orderDate) {
      const orderDate = new Date(rfp.orderDate);
      const deliveryDate = new Date(rfp.deliveryDate);
      daysToDeliver = Math.ceil((deliveryDate.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24));
    }
    
    return {
      id: rfp.id,
      clientName: rfp.clientName,
      daysToQuote,
      daysToDeliver,
      status: rfp.status
    };
  });
  
  return delays;
};
