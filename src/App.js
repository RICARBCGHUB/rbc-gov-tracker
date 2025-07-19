import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Search, Edit, Trash2, DollarSign, TrendingUp, AlertCircle, FileText, Award, X } from 'lucide-react';
import './App.css';

const RBCGovTracker = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [opportunities, setOpportunities] = useState([]);
  const [awardedContracts, setAwardedContracts] = useState([]);
  const [lostAwards, setLostAwards] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  // Sample data initialization
  useEffect(() => {
    const sampleOpportunities = [
      {
        id: 1,
        requirementName: 'IT Support Services',
        solicitationNumber: 'W912DY-25-R-0001',
        agency: 'Department of Defense',
        issuingOfficer: 'Defense Logistics Agency',
        requirementType: 'RFP',
        capabilityType: 'Services',
        qaDeadline: '2025-08-15',
        proposalDeadline: '2025-09-01',
        popStart: '2025-10-01',
        popEnd: '2026-09-30',
        status: 'Active',
        primeSubcontractor: 'Prime',
        estimatedValue: 2500000,
        probability: 75,
        qaPending: 3
      },
      {
        id: 2,
        requirementName: 'Cybersecurity Assessment',
        solicitationNumber: 'GS-35F-0119Y',
        agency: 'General Services Administration',
        issuingOfficer: 'GSA IT Category',
        requirementType: 'RFQ',
        capabilityType: 'Services',
        qaDeadline: '2025-07-25',
        proposalDeadline: '2025-08-10',
        popStart: '2025-09-01',
        popEnd: '2026-08-31',
        status: 'Submitted',
        primeSubcontractor: 'Subcontractor',
        estimatedValue: 1200000,
        probability: 60,
        qaPending: 0
      },
      {
        id: 3,
        requirementName: 'Data Analytics Platform',
        solicitationNumber: 'FA8771-25-R-0025',
        agency: 'Air Force',
        issuingOfficer: 'Air Force Materiel Command',
        requirementType: 'RFP',
        capabilityType: 'Mix',
        qaDeadline: '2025-09-05',
        proposalDeadline: '2025-10-15',
        popStart: '2026-01-01',
        popEnd: '2028-12-31',
        status: 'Active',
        primeSubcontractor: 'Prime',
        estimatedValue: 5000000,
        probability: 85,
        qaPending: 5
      }
    ];

    const sampleAwarded = [
      {
        id: 1,
        requirementName: 'Network Infrastructure Upgrade',
        solicitationNumber: 'N00178-24-R-1234',
        agency: 'Navy',
        awardDate: '2025-06-15',
        popStartDate: '2025-07-01',
        deliveryDate: '2025-07-01',
        postAwardConference: '2025-06-20',
        kickoffMeeting: '2025-06-25',
        managementPlanDate: '2025-07-10',
        awardValue: 3500000,
        primeSubcontractor: 'Prime'
      },
      {
        id: 2,
        requirementName: 'Cloud Migration Services',
        solicitationNumber: 'GSA-25-C-0089',
        agency: 'General Services Administration',
        awardDate: '2025-05-20',
        popStartDate: '2025-06-01',
        deliveryDate: '2025-06-01',
        postAwardConference: '2025-05-25',
        kickoffMeeting: '2025-05-30',
        managementPlanDate: '2025-06-15',
        awardValue: 2800000,
        primeSubcontractor: 'Subcontractor'
      }
    ];

    const sampleLost = [
      {
        id: 1,
        requirementName: 'Database Modernization',
        solicitationNumber: 'DHS-24-R-5678',
        agency: 'Department of Homeland Security',
        notificationDate: '2025-05-20',
        winningContractor: 'TechCorp Solutions',
        debriefDate: '2025-05-25',
        estimatedValue: 1800000
      },
      {
        id: 2,
        requirementName: 'Software Development Services',
        solicitationNumber: 'VA-24-R-9012',
        agency: 'Department of Veterans Affairs',
        notificationDate: '2025-04-15',
        winningContractor: 'Global Tech Partners',
        debriefDate: '2025-04-20',
        estimatedValue: 2200000
      }
    ];

    setOpportunities(sampleOpportunities);
    setAwardedContracts(sampleAwarded);
    setLostAwards(sampleLost);
  }, []);

  // Calculations for overview
  const overviewStats = useMemo(() => {
    const totalOpportunities = opportunities.length;
    const totalValue = opportunities.reduce((sum, opp) => sum + (opp.estimatedValue || 0), 0);
    const avgProbability = opportunities.length > 0 
      ? Math.round(opportunities.reduce((sum, opp) => sum + (opp.probability || 0), 0) / opportunities.length)
      : 0;
    const totalQAPending = opportunities.reduce((sum, opp) => sum + (opp.qaPending || 0), 0);
    
    return {
      totalOpportunities,
      totalValue,
      avgProbability,
      totalQAPending,
      totalAwarded: awardedContracts.length,
      totalLost: lostAwards.length,
      awardedValue: awardedContracts.reduce((sum, award) => sum + (award.awardValue || 0), 0)
    };
  }, [opportunities, awardedContracts, lostAwards]);

  // Filter opportunities based on search and filters
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter(opp => {
      const matchesSearch = searchTerm === '' || 
        opp.requirementName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.solicitationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.agency.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || opp.status.toLowerCase() === filterStatus.toLowerCase();
      const matchesType = filterType === 'all' || opp.requirementType.toLowerCase() === filterType.toLowerCase();
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [opportunities, searchTerm, filterStatus, filterType]);

  // Add new opportunity
  const addOpportunity = (newOpp) => {
    const id = Math.max(...opportunities.map(o => o.id), 0) + 1;
    setOpportunities([...opportunities, { ...newOpp, id }]);
    setShowAddModal(false);
  };

  // Edit opportunity
  const editOpportunity = (updatedOpp) => {
    setOpportunities(opportunities.map(opp => 
      opp.id === updatedOpp.id ? updatedOpp : opp
    ));
    setEditingItem(null);
  };

  // Delete opportunity
  const deleteOpportunity = (id) => {
    if (window.confirm('Are you sure you want to delete this opportunity?')) {
      setOpportunities(opportunities.filter(opp => opp.id !== id));
    }
  };

  // Move opportunity to awarded
  const moveToAwarded = (opp) => {
    if (window.confirm('Move this opportunity to Awarded Contracts?')) {
      const awarded = {
        ...opp,
        id: Math.max(...awardedContracts.map(a => a.id), 0) + 1,
        awardDate: new Date().toISOString().split('T')[0],
        popStartDate: opp.popStart,
        deliveryDate: opp.popStart,
        postAwardConference: '',
        kickoffMeeting: '',
        managementPlanDate: '',
        awardValue: opp.estimatedValue
      };
      setAwardedContracts([...awardedContracts, awarded]);
      deleteOpportunity(opp.id);
    }
  };

  // Move opportunity to lost
  const moveToLost = (opp) => {
    if (window.confirm('Move this opportunity to Lost Awards?')) {
      const lost = {
        ...opp,
        id: Math.max(...lostAwards.map(l => l.id), 0) + 1,
        notificationDate: new Date().toISOString().split('T')[0],
        winningContractor: '',
        debriefDate: '',
        estimatedValue: opp.estimatedValue
      };
      setLostAwards([...lostAwards, lost]);
      deleteOpportunity(opp.id);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US');
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      'RFP': 'bg-purple-100 text-purple-800',
      'RFQ': 'bg-orange-100 text-orange-800',
      'RFI': 'bg-yellow-100 text-yellow-800',
      'ITB': 'bg-red-100 text-red-800',
      'Sources Sought': 'bg-indigo-100 text-indigo-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">RBC Government Requirement Tracker</h1>
              <p className="text-sm text-gray-600">RICAR Business Consulting LLC</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus size={20} />
              Add Opportunity
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { key: 'overview', label: 'Overview', icon: TrendingUp },
              { key: 'opportunities', label: 'Government Opportunity Tracker', icon: FileText },
              { key: 'awarded', label: 'Awarded Contract', icon: Award },
              { key: 'lost', label: 'Lost Award', icon: X }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Opportunities</p>
                    <p className="text-2xl font-bold text-gray-900">{overviewStats.totalOpportunities}</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Pipeline Value</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(overviewStats.totalValue)}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Probability</p>
                    <p className="text-2xl font-bold text-gray-900">{overviewStats.avgProbability}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Q&A Pending</p>
                    <p className="text-2xl font-bold text-gray-900">{overviewStats.totalQAPending}</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Contract Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Awarded Contracts:</span>
                    <span className="font-medium">{overviewStats.totalAwarded}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lost Awards:</span>
                    <span className="font-medium">{overviewStats.totalLost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Awarded Value:</span>
                    <span className="font-medium">{formatCurrency(overviewStats.awardedValue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Win Rate:</span>
                    <span className="font-medium">
                      {overviewStats.totalAwarded + overviewStats.totalLost > 0 
                        ? Math.round((overviewStats.totalAwarded / (overviewStats.totalAwarded + overviewStats.totalLost)) * 100)
                        : 0}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {opportunities.slice(0, 3).map(opp => (
                    <div key={opp.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{opp.requirementName}</p>
                        <p className="text-xs text-gray-500">{opp.agency}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(opp.status)}`}>
                        {opp.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Government Opportunity Tracker Tab */}
        {activeTab === 'opportunities' && (
          <div className="space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-center">
                  <p className="text-lg font-bold text-blue-600">{overviewStats.totalOpportunities}</p>
                  <p className="text-sm text-gray-600">Total Opportunities</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-center">
                  <p className="text-lg font-bold text-green-600">{formatCurrency(overviewStats.totalValue)}</p>
                  <p className="text-sm text-gray-600">Total Values</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-center">
                  <p className="text-lg font-bold text-purple-600">{overviewStats.avgProbability}%</p>
                  <p className="text-sm text-gray-600">Average Probability</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-center">
                  <p className="text-lg font-bold text-orange-600">{overviewStats.totalQAPending}</p>
                  <p className="text-sm text-gray-600">Q&A Pending</p>
                </div>
              </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search opportunities..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="submitted">Submitted</option>
                </select>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="rfp">RFP</option>
                  <option value="rfq">RFQ</option>
                  <option value="rfi">RFI</option>
                  <option value="itb">ITB</option>
                  <option value="sources sought">Sources Sought</option>
                </select>
              </div>
            </div>

            {/* Opportunities Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Opportunity Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Agency & Officer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type & Capability
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Key Dates
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Value & Probability
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status & Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOpportunities.map((opp) => (
                      <tr key={opp.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{opp.requirementName}</div>
                            <div className="text-sm text-gray-500">{opp.solicitationNumber}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{opp.agency}</div>
                          <div className="text-sm text-gray-500">{opp.issuingOfficer}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(opp.requirementType)}`}>
                            {opp.requirementType}
                          </span>
                          <div className="text-sm text-gray-500 mt-1">{opp.capabilityType}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div>Q&A: {formatDate(opp.qaDeadline)}</div>
                          <div>Proposal: {formatDate(opp.proposalDeadline)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div>{formatCurrency(opp.estimatedValue)}</div>
                          <div className="text-purple-600">{opp.probability}%</div>
                          {opp.qaPending > 0 && (
                            <div className="text-orange-600 text-xs">Q&A: {opp.qaPending}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(opp.status)}`}>
                            {opp.status}
                          </span>
                          <div className="text-sm text-gray-500 mt-1">{opp.primeSubcontractor}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingItem(opp)}
                              className="text-blue-600 hover:text-blue-900"
                              title="Edit"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => moveToAwarded(opp)}
                              className="text-green-600 hover:text-green-900"
                              title="Move to Awarded"
                            >
                              <Award size={16} />
                            </button>
                            <button
                              onClick={() => moveToLost(opp)}
                              className="text-red-600 hover:text-red-900"
                              title="Move to Lost"
                            >
                              <X size={16} />
                            </button>
                            <button
                              onClick={() => deleteOpportunity(opp.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Awarded Contract Tab */}
        {activeTab === 'awarded' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Awarded Contracts</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contract Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Agency
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Award Information
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Key Milestone Dates
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contract Value
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {awardedContracts.map((contract) => (
                    <tr key={contract.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{contract.requirementName}</div>
                          <div className="text-sm text-gray-500">{contract.solicitationNumber}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {contract.agency}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>Award Date: {formatDate(contract.awardDate)}</div>
                        <div>POP Start: {formatDate(contract.popStartDate)}</div>
                        <div>Delivery: {formatDate(contract.deliveryDate)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="text-xs space-y-1">
                          <div>Post-Award Conference: {formatDate(contract.postAwardConference)}</div>
                          <div>Kickoff Meeting: {formatDate(contract.kickoffMeeting)}</div>
                          <div>Management Plan: {formatDate(contract.managementPlanDate)}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="font-medium text-green-600">{formatCurrency(contract.awardValue)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          contract.primeSubcontractor === 'Prime' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                        }`}>
                          {contract.primeSubcontractor}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Lost Award Tab */}
        {activeTab === 'lost' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Lost Awards</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Opportunity Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Agency
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Notification Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Winning Contractor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Debrief Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estimated Value
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {lostAwards.map((lost) => (
                    <tr key={lost.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{lost.requirementName}</div>
                          <div className="text-sm text-gray-500">{lost.solicitationNumber}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {lost.agency}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(lost.notificationDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {lost.winningContractor || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(lost.debriefDate) || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="font-medium text-red-600">{formatCurrency(lost.estimatedValue)}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingItem) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingItem ? 'Edit Opportunity' : 'Add New Opportunity'}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingItem(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <OpportunityForm
              opportunity={editingItem}
              onSubmit={editingItem ? editOpportunity : addOpportunity}
              onCancel={() => {
                setShowAddModal(false);
                setEditingItem(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Opportunity Form Component
const OpportunityForm = ({ opportunity, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    requirementName: '',
    solicitationNumber: '',
    agency: '',
    issuingOfficer: '',
    requirementType: 'RFP',
    capabilityType: 'Services',
    qaDeadline: '',
    proposalDeadline: '',
    popStart: '',
    popEnd: '',
    status: 'Active',
    primeSubcontractor: 'Prime',
    estimatedValue: '',
    probability: 50,
    qaPending: 0,
    ...opportunity
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      estimatedValue: parseFloat(formData.estimatedValue) || 0,
      probability: parseInt(formData.probability) || 0,
      qaPending: parseInt(formData.qaPending) || 0
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Requirement Name *
          </label>
          <input
            type="text"
            name="requirementName"
            value={formData.requirementName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Solicitation Number *
          </label>
          <input
            type="text"
            name="solicitationNumber"
            value={formData.solicitationNumber}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Federal/State Agency *
          </label>
          <input
            type="text"
            name="agency"
            value={formData.agency}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Issuing Officer (Contracting Office/Department)
          </label>
          <input
            type="text"
            name="issuingOfficer"
            value={formData.issuingOfficer}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Requirement Type *
          </label>
          <select
            name="requirementType"
            value={formData.requirementType}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Sources Sought">Sources Sought</option>
            <option value="RFI">RFI</option>
            <option value="RFP">RFP</option>
            <option value="RFQ">RFQ</option>
            <option value="ITB">ITB</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Capability Type *
          </label>
          <select
            name="capabilityType"
            value={formData.capabilityType}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Services">Services</option>
            <option value="Commodities">Commodities</option>
            <option value="Mix">Mix</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Q&A Due Date
          </label>
          <input
            type="date"
            name="qaDeadline"
            value={formData.qaDeadline}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Proposal Due Date *
          </label>
          <input
            type="date"
            name="proposalDeadline"
            value={formData.proposalDeadline}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Period of Performance Start Date
          </label>
          <input
            type="date"
            name="popStart"
            value={formData.popStart}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Period of Performance End Date
          </label>
          <input
            type="date"
            name="popEnd"
            value={formData.popEnd}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status *
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Active">Active</option>
            <option value="Submitted">Submitted</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prime/Subcontractor *
          </label>
          <select
            name="primeSubcontractor"
            value={formData.primeSubcontractor}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Prime">Prime</option>
            <option value="Subcontractor">Subcontractor</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estimated Value ($)
          </label>
          <input
            type="number"
            name="estimatedValue"
            value={formData.estimatedValue}
            onChange={handleChange}
            min="0"
            step="1000"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Probability (%)
          </label>
          <input
            type="number"
            name="probability"
            value={formData.probability}
            onChange={handleChange}
            min="0"
            max="100"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Q&A Pending Count
          </label>
          <input
            type="number"
            name="qaPending"
            value={formData.qaPending}
            onChange={handleChange}
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-6 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {opportunity ? 'Update Opportunity' : 'Add Opportunity'}
        </button>
      </div>
    </form>
  );
};

function App() {
  return (
    <div className="App">
      <RBCGovTracker />
    </div>
  );
}

export default App;