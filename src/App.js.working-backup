import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Award, X, Calendar, DollarSign, Users, FileText, Clock, Building } from 'lucide-react';

const RBCGovTracker = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [opportunities, setOpportunities] = useState([]);
  const [awardedContracts, setAwardedContracts] = useState([]);
  const [lostAwards, setLostAwards] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  // Enhanced form data structure with all new fields
  const [formData, setFormData] = useState({
    requirementName: '',
    solicitationNumber: '',
    agency: '',
    issuingOfficer: '',
    requirementType: '',
    capabilityType: '',
    qaDueDate: '',
    proposalDueDate: '',
    // Updated Period of Performance structure
    baseYear: { start: '', end: '', cost: '' },
    optionYear1: { start: '', end: '', cost: '' },
    optionYear2: { start: '', end: '', cost: '' },
    optionYear3: { start: '', end: '', cost: '' },
    optionYear4: { start: '', end: '', cost: '' },
    // Updated Prime/Subcontractor structure
    primeName: '',
    subcontractorName: '',
    estimatedValue: 0, // Auto-calculated
    setAside: '',
    probability: 50,
    status: 'Active',
    // Updated Q&A Milestone structure
    qaSubmittalDeadline: '',
    anticipatedGovResponse: '',
    // Contract Vehicle Type
    contractVehicleType: '',
    notes: ''
  });

  // Enhanced awarded contract form data
  const [awardedFormData, setAwardedFormData] = useState({
    awardDate: '',
    contractValue: {
      baseYear: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      total: 0
    },
    popStartDate: '',
    currentExecutionYear: { start: '', end: '' },
    postAwardConference: '',
    kickoffMeeting: '',
    managementPlanDate: '',
    contractVehicleType: '',
    deliverables: ''
  });

  // Enhanced lost award form data
  const [lostFormData, setLostFormData] = useState({
    notificationDate: '',
    unsuccessfulOfferReceiptDate: '',
    winningContractor: '',
    debriefDate: '',
    value: ''
  });

  // Auto-calculate estimated value from all years
  const calculateEstimatedValue = (data) => {
    const baseYearCost = parseFloat(data.baseYear.cost) || 0;
    const option1Cost = parseFloat(data.optionYear1.cost) || 0;
    const option2Cost = parseFloat(data.optionYear2.cost) || 0;
    const option3Cost = parseFloat(data.optionYear3.cost) || 0;
    const option4Cost = parseFloat(data.optionYear4.cost) || 0;
    
    return baseYearCost + option1Cost + option2Cost + option3Cost + option4Cost;
  };

  // Auto-calculate awarded contract total value
  const calculateAwardedTotal = (contractValue) => {
    const baseYear = parseFloat(contractValue.baseYear) || 0;
    const option1 = parseFloat(contractValue.option1) || 0;
    const option2 = parseFloat(contractValue.option2) || 0;
    const option3 = parseFloat(contractValue.option3) || 0;
    const option4 = parseFloat(contractValue.option4) || 0;
    
    return baseYear + option1 + option2 + option3 + option4;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Update estimated value whenever cost fields change
  useEffect(() => {
    const total = calculateEstimatedValue(formData);
    setFormData(prev => ({
      ...prev,
      estimatedValue: total
    }));
  }, [formData.baseYear.cost, formData.optionYear1.cost, formData.optionYear2.cost, formData.optionYear3.cost, formData.optionYear4.cost]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingOpportunity) {
      setOpportunities(prev => prev.map(opp => 
        opp.id === editingOpportunity.id 
          ? { ...formData, id: editingOpportunity.id }
          : opp
      ));
      setEditingOpportunity(null);
    } else {
      const newOpportunity = {
        ...formData,
        id: Date.now(),
        dateAdded: new Date().toISOString().split('T')[0]
      };
      setOpportunities(prev => [...prev, newOpportunity]);
    }
    
    resetForm();
    setShowForm(false);
  };

  const resetForm = () => {
    setFormData({
      requirementName: '',
      solicitationNumber: '',
      agency: '',
      issuingOfficer: '',
      requirementType: '',
      capabilityType: '',
      qaDueDate: '',
      proposalDueDate: '',
      baseYear: { start: '', end: '', cost: '' },
      optionYear1: { start: '', end: '', cost: '' },
      optionYear2: { start: '', end: '', cost: '' },
      optionYear3: { start: '', end: '', cost: '' },
      optionYear4: { start: '', end: '', cost: '' },
      primeName: '',
      subcontractorName: '',
      estimatedValue: 0,
      setAside: '',
      probability: 50,
      status: 'Active',
      qaSubmittalDeadline: '',
      anticipatedGovResponse: '',
      contractVehicleType: '',
      notes: ''
    });
  };

  const editOpportunity = (opportunity) => {
    setFormData(opportunity);
    setEditingOpportunity(opportunity);
    setShowForm(true);
  };

  const deleteOpportunity = (id) => {
    setOpportunities(prev => prev.filter(opp => opp.id !== id));
  };

  const moveToAwarded = (opportunity) => {
    setAwardedContracts(prev => [...prev, { 
      ...opportunity, 
      awardedId: Date.now(),
      ...awardedFormData 
    }]);
    setOpportunities(prev => prev.filter(opp => opp.id !== opportunity.id));
  };

  const moveToLost = (opportunity) => {
    setLostAwards(prev => [...prev, { 
      ...opportunity, 
      lostId: Date.now(),
      ...lostFormData 
    }]);
    setOpportunities(prev => prev.filter(opp => opp.id !== opportunity.id));
  };

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.requirementName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.solicitationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.agency.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || opp.status === filterStatus;
    const matchesType = filterType === 'all' || opp.requirementType === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Overview calculations
  const totalOpportunities = opportunities.length;
  const totalPipelineValue = opportunities.reduce((sum, opp) => sum + (opp.estimatedValue || 0), 0);
  const averageProbability = opportunities.length > 0 
    ? opportunities.reduce((sum, opp) => sum + (opp.probability || 0), 0) / opportunities.length 
    : 0;
  const qaPendingCount = opportunities.filter(opp => 
    opp.qaSubmittalDeadline && new Date(opp.qaSubmittalDeadline) > new Date()
  ).length;
  const totalAwardedValue = awardedContracts.reduce((sum, contract) => sum + (contract.estimatedValue || 0), 0);
  const totalLostValue = lostAwards.reduce((sum, award) => sum + (award.estimatedValue || 0), 0);

  const renderOverview = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Opportunities</p>
              <p className="text-2xl font-bold text-gray-900">{totalOpportunities}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pipeline Value</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalPipelineValue)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg. Probability</p>
              <p className="text-2xl font-bold text-gray-900">{averageProbability.toFixed(1)}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Q&A Milestones</p>
              <p className="text-2xl font-bold text-gray-900">{qaPendingCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contract Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Awarded Contracts</h3>
          <p className="text-3xl font-bold text-green-600">{awardedContracts.length}</p>
          <p className="text-sm text-gray-600 mt-2">Total Value: {formatCurrency(totalAwardedValue)}</p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Lost Awards</h3>
          <p className="text-3xl font-bold text-red-600">{lostAwards.length}</p>
          <p className="text-sm text-gray-600 mt-2">Total Value: {formatCurrency(totalLostValue)}</p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Win Rate</h3>
          <p className="text-3xl font-bold text-blue-600">
            {awardedContracts.length + lostAwards.length > 0 
              ? ((awardedContracts.length / (awardedContracts.length + lostAwards.length)) * 100).toFixed(1)
              : 0}%
          </p>
          <p className="text-sm text-gray-600 mt-2">Based on completed opportunities</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Opportunities</h3>
        <div className="space-y-3">
          {opportunities.slice(0, 5).map(opp => (
            <div key={opp.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
              <div>
                <p className="font-medium text-gray-900">{opp.requirementName}</p>
                <p className="text-sm text-gray-600">{opp.agency} • {formatCurrency(opp.estimatedValue)}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                opp.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {opp.status}
              </span>
            </div>
          ))}
          {opportunities.length === 0 && (
            <p className="text-gray-500 text-center py-4">No opportunities added yet</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderPeriodOfPerformanceForm = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Period of Performance</h4>
        
        {/* Base Year */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h5 className="font-medium text-gray-800 mb-3">Base Year</h5>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                name="baseYear.start"
                value={formData.baseYear.start}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                name="baseYear.end"
                value={formData.baseYear.end}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Cost</label>
              <input
                type="number"
                step="0.01"
                name="baseYear.cost"
                value={formData.baseYear.cost}
                onChange={handleInputChange}
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Option Years */}
        {[1, 2, 3, 4].map(yearNum => (
          <div key={yearNum} className="border border-gray-200 rounded-lg p-4">
            <h5 className="font-medium text-gray-800 mb-3">Option Year {yearNum}</h5>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  name={`optionYear${yearNum}.start`}
                  value={formData[`optionYear${yearNum}`].start}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  name={`optionYear${yearNum}.end`}
                  value={formData[`optionYear${yearNum}`].end}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Cost</label>
                <input
                  type="number"
                  step="0.01"
                  name={`optionYear${yearNum}.cost`}
                  value={formData[`optionYear${yearNum}`].cost}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Estimated Value Display */}
      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-4">Total Estimated Value</h4>
          <p className="text-3xl font-bold text-blue-600">{formatCurrency(formData.estimatedValue)}</p>
          <p className="text-sm text-gray-600 mt-2">Automatically calculated from all years</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h5 className="font-medium text-gray-800 mb-3">Value Breakdown</h5>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Base Year:</span>
              <span>{formatCurrency(parseFloat(formData.baseYear.cost) || 0)}</span>
            </div>
            {[1, 2, 3, 4].map(yearNum => (
              <div key={yearNum} className="flex justify-between">
                <span>Option Year {yearNum}:</span>
                <span>{formatCurrency(parseFloat(formData[`optionYear${yearNum}`].cost) || 0)}</span>
              </div>
            ))}
            <div className="border-t border-gray-200 pt-2 font-medium flex justify-between">
              <span>Total:</span>
              <span>{formatCurrency(formData.estimatedValue)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOpportunityForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">
            {editingOpportunity ? 'Edit Opportunity' : 'Add New Opportunity'}
          </h3>
          <button
            onClick={() => {
              setShowForm(false);
              setEditingOpportunity(null);
              resetForm();
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Requirement Name *</label>
              <input
                type="text"
                name="requirementName"
                value={formData.requirementName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Solicitation Number</label>
              <input
                type="text"
                name="solicitationNumber"
                value={formData.solicitationNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Federal or State Agency *</label>
              <input
                type="text"
                name="agency"
                value={formData.agency}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Officer/Department</label>
              <input
                type="text"
                name="issuingOfficer"
                value={formData.issuingOfficer}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Requirement Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Requirement Type</label>
              <select
                name="requirementType"
                value={formData.requirementType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Type</option>
                <option value="Sources Sought">Sources Sought</option>
                <option value="RFI">RFI</option>
                <option value="RFP">RFP</option>
                <option value="RFQ">RFQ</option>
                <option value="ITB">ITB</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Capability Type</label>
              <select
                name="capabilityType"
                value={formData.capabilityType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Capability</option>
                <option value="Services">Services</option>
                <option value="Commodities">Commodities</option>
                <option value="Construction">Construction</option>
                <option value="Research & Development(R&D)">Research & Development (R&D)</option>
                <option value="Mix">Mix</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Set Aside</label>
              <select
                name="setAside"
                value={formData.setAside}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Set Aside</option>
                <option value="SBE">SBE (Small Business Enterprise)</option>
                <option value="MBE">MBE (Minority Business Enterprise)</option>
                <option value="Women Owned Business">Women Owned Business</option>
                <option value="SDVOSB">SDVOSB</option>
                <option value="HUBZone">HUBZone</option>
                <option value="8(a)">8(a)</option>
                <option value="WOSB">WOSB</option>
                <option value="None">None</option>
              </select>
            </div>
          </div>

          {/* Contract Vehicle Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contract Vehicle Type</label>
              <select
                name="contractVehicleType"
                value={formData.contractVehicleType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Vehicle Type</option>
                <option value="Purchase Order">Purchase Order</option>
                <option value="Follow On PO">Follow On PO</option>
                <option value="Mass Multiple Award Contract (IDIQ)">Mass Multiple Award Contract (IDIQ)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Submitted">Submitted</option>
              </select>
            </div>
          </div>

          {/* Prime/Subcontractor Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prime Contractor Name</label>
              <input
                type="text"
                name="primeName"
                value={formData.primeName}
                onChange={handleInputChange}
                placeholder="Enter prime contractor name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subcontractor Name</label>
              <input
                type="text"
                name="subcontractorName"
                value={formData.subcontractorName}
                onChange={handleInputChange}
                placeholder="Enter subcontractor name                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Q&A Milestone */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Q&A Submittal Deadline to Government</label>
              <input
                type="date"
                name="qaSubmittalDeadline"
                value={formData.qaSubmittalDeadline}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Anticipated Government Response</label>
              <input
                type="date"
                name="anticipatedGovResponse"
                value={formData.anticipatedGovResponse}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Proposal Due Date</label>
              <input
                type="date"
                name="proposalDueDate"
                value={formData.proposalDueDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Probability */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Probability (%)</label>
              <input
                type="range"
                name="probability"
                min="0"
                max="100"
                value={formData.probability}
                onChange={handleInputChange}
                className="w-full"
              />
              <div className="text-center text-sm text-gray-600 mt-1">{formData.probability}%</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Additional notes or comments"
              />
            </div>
          </div>

          {/* Period of Performance */}
          {renderPeriodOfPerformanceForm()}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingOpportunity(null);
                resetForm();
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {editingOpportunity ? 'Update Opportunity' : 'Add Opportunity'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderOpportunitiesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Government Opportunities</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Opportunity
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search opportunities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Submitted">Submitted</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="Sources Sought">Sources Sought</option>
            <option value="RFI">RFI</option>
            <option value="RFP">RFP</option>
            <option value="RFQ">RFQ</option>
            <option value="ITB">ITB</option>
          </select>
          <div className="text-sm text-gray-600 flex items-center">
            <FileText className="h-4 w-4 mr-1" />
            {filteredOpportunities.length} opportunities
          </div>
        </div>
      </div>

      {/* Opportunities Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Opportunity Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Agency & Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value & Probability
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Key Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOpportunities.map((opportunity) => (
                <tr key={opportunity.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {opportunity.requirementName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {opportunity.solicitationNumber}
                      </div>
                      {opportunity.contractVehicleType && (
                        <div className="text-xs text-blue-600 mt-1">
                          {opportunity.contractVehicleType}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{opportunity.agency}</div>
                    <div className="text-sm text-gray-500">{opportunity.requirementType}</div>
                    <div className="text-xs text-gray-500">{opportunity.capabilityType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(opportunity.estimatedValue)}
                    </div>
                    <div className="text-sm text-gray-500">{opportunity.probability}% probability</div>
                    {opportunity.setAside && (
                      <div className="text-xs text-green-600">{opportunity.setAside}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>Q&A: {opportunity.qaSubmittalDeadline || 'TBD'}</div>
                    <div>Proposal: {opportunity.proposalDueDate || 'TBD'}</div>
                    {opportunity.anticipatedGovResponse && (
                      <div className="text-xs text-gray-500">
                        Gov Response: {opportunity.anticipatedGovResponse}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      opportunity.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {opportunity.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => editOpportunity(opportunity)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => moveToAwarded(opportunity)}
                        className="text-green-600 hover:text-green-900"
                        title="Mark as Awarded"
                      >
                        <Award className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => moveToLost(opportunity)}
                        className="text-red-600 hover:text-red-900"
                        title="Mark as Lost"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteOpportunity(opportunity.id)}
                        className="text-gray-600 hover:text-gray-900"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredOpportunities.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No opportunities found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by adding a new opportunity.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderAwardedTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Awarded Contracts</h2>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Total Awarded Value: {formatCurrency(totalAwardedValue)}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contract Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contract Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Key Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Post-Award Activities
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Execution
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {awardedContracts.map((contract) => (
                <tr key={contract.awardedId} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {contract.requirementName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {contract.solicitationNumber}
                      </div>
                      <div className="text-sm text-gray-500">{contract.agency}</div>
                      {contract.contractVehicleType && (
                        <div className="text-xs text-blue-600 mt-1">
                          {contract.contractVehicleType}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">
                        Total: {formatCurrency(contract.estimatedValue)}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        <div>Base: {formatCurrency(parseFloat(contract.baseYear?.cost) || 0)}</div>
                        {[1, 2, 3, 4].map(yearNum => {
                          const cost = parseFloat(contract[`optionYear${yearNum}`]?.cost) || 0;
                          return cost > 0 && (
                            <div key={yearNum}>Opt {yearNum}: {formatCurrency(cost)}</div>
                          );
                        })}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div>Award: {contract.awardDate || 'TBD'}</div>
                    <div>POP Start: {contract.popStartDate || 'TBD'}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div>Conference: {contract.postAwardConference || 'TBD'}</div>
                    <div>Kickoff: {contract.kickoffMeeting || 'TBD'}</div>
                    <div>Mgmt Plan: {contract.managementPlanDate || 'TBD'}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div>Start: {contract.currentExecutionYear?.start || 'TBD'}</div>
                    <div>End: {contract.currentExecutionYear?.end || 'TBD'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="text-blue-600 hover:text-blue-900"
                      title="Edit Contract Details"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {awardedContracts.length === 0 && (
          <div className="text-center py-12">
            <Award className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No awarded contracts</h3>
            <p className="mt-1 text-sm text-gray-500">
              Awarded contracts will appear here when opportunities are marked as won.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderLostTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Lost Awards</h2>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Total Lost Value: {formatCurrency(totalLostValue)}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Opportunity Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estimated Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notification Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Winner & Debrief
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lostAwards.map((award) => (
                <tr key={award.lostId} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {award.requirementName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {award.solicitationNumber}
                      </div>
                      <div className="text-sm text-gray-500">{award.agency}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(award.estimatedValue)}
                    </div>
                    <div className="text-sm text-gray-500">{award.probability}% probability</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>Notification: {award.notificationDate || 'TBD'}</div>
                    <div>Receipt: {award.unsuccessfulOfferReceiptDate || 'TBD'}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div>Winner: {award.winningContractor || 'TBD'}</div>
                    <div>Debrief: {award.debriefDate || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="text-blue-600 hover:text-blue-900"
                      title="Edit Lost Award Details"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {lostAwards.length === 0 && (
          <div className="text-center py-12">
            <X className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No lost awards</h3>
            <p className="mt-1 text-sm text-gray-500">
              Lost opportunities will appear here when opportunities are marked as lost.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Building className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  RBC Government Requirement Tracker
                </h1>
                <p className="text-sm text-gray-600">
                  RICAR Business Consulting LLC - Enhanced Tracking Dashboard
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: DollarSign },
              { id: 'opportunities', name: 'Government Opportunities', icon: FileText },
              { id: 'awarded', name: 'Awarded Contracts', icon: Award },
              { id: 'lost', name: 'Lost Awards', icon: X }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'opportunities' && renderOpportunitiesTab()}
        {activeTab === 'awarded' && renderAwardedTab()}
        {activeTab === 'lost' && renderLostTab()}
      </div>

      {/* Form Modal */}
      {showForm && renderOpportunityForm()}
    </div>
  );
};

function App() {
  return <RBCGovTracker />;
}

export default App;
EOFwc -l src/App.js
tail -5 src/App.js
function App() {
  return <RBCGovTracker />;
}

export default App;
