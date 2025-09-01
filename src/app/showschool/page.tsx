'use client'

import React, { useState, useEffect } from 'react';
import { Copy, Phone, Mail, MapPin, ChevronDown, ChevronUp, User } from 'lucide-react';


type School ={
  id: number;
  name: string;
  address: string;
  state: string;
  city: string;
  contact: string;
  image: FileList|string;
  email_id: string;
}


const SchoolsPage = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [copiedField, setCopiedField] = useState<number|string|null>(null);

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const response = await fetch('/api/school');
      if (!response.ok) {
        throw new Error('Failed to fetch schools');
      }
      const data = await response.json();
      setSchools(data);
      console.log(data)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text:string, fieldId:string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldId);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const toggleExpanded = (schoolId:number) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(schoolId)) {
      newExpanded.delete(schoolId);
    } else {
      newExpanded.add(schoolId);
    }
    setExpandedCards(newExpanded);
  };

  const formatAddress = (address:string) => {
    return address.replace(/\n/g, ', ');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading schools...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              Error: {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Schools Directory</h1>
          <p className="text-gray-600">Manage and view all registered schools</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {schools.map((school) => {
            const isExpanded = expandedCards.has(school.id);
            const isSchool = school.name.toLowerCase().includes('school');
            
            return (
              <div key={school.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
                <div 
                  className={`relative h-32 ${school.image ? '' : 'bg-gradient-to-br from-blue-400 to-blue-600'}`}
                  style={school.image ? {
                   backgroundImage: `url("${school.image}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  } : {}}
                >
                  {/* <div className="absolute inset-0 bg-black bg-opacity-30"></div> */}
                  
                  {!school.image && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      {isSchool ? (
                        <div className="text-white font-bold text-4xl">
                          {school.name.charAt(0)}
                        </div>
                      ) : (
                        <User className="w-16 h-16 text-white" />
                      )}
                    </div>
                  )}
                </div>

          
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {school.name}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="truncate">{school.city}, {school.state}</span>
                    </div>
                  </div>

    
                  <div className="space-y-3">
   
                    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-3">
                        <Phone className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium">{school.contact}</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(school.contact.toString(), `phone-${school.id}`)}
                        className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Copy phone number"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      {copiedField === `phone-${school.id}` && (
                        <span className="text-xs text-green-600 ml-2">Copied!</span>
                      )}
                    </div>

        
                    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium truncate">{school.email_id}</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(school.email_id, `email-${school.id}`)}
                        className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Copy email"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      {copiedField === `email-${school.id}` && (
                        <span className="text-xs text-green-600 ml-2">Copied!</span>
                      )}
                    </div>
                  </div>

      
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Full Address
                          </label>
                          <p className="text-sm text-gray-700 mt-1">
                            {formatAddress(school.address)}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                              City
                            </label>
                            <p className="text-sm text-gray-700 mt-1">{school.city}</p>
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                              State
                            </label>
                            <p className="text-sm text-gray-700 mt-1">{school.state}</p>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            ID
                          </label>
                          <p className="text-sm text-gray-700 mt-1">#{school.id}</p>
                        </div>
                      </div>
                    </div>
                  )}

             
                  <button
                    onClick={() => toggleExpanded(school.id)}
                    className="w-full mt-4 flex items-center justify-center space-x-2 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <span>{isExpanded ? 'Show Less' : 'More Details'}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>


        {schools.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No schools found</h3>
            <p className="text-gray-600">There are no schools registered in the system yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchoolsPage;