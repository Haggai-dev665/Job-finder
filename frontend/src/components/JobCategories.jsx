import React, { useContext } from 'react';
import { 
  Code, 
  Stethoscope, 
  GraduationCap, 
  Palette, 
  BarChart3, 
  Wrench, 
  Truck, 
  ChefHat, 
  Gavel, 
  Building2,
  Calculator,
  Headphones
} from 'lucide-react';
import { ThemeContext } from '../contexts/ThemeContext';

const JobCategories = ({ categoriesData = null }) => {
  const { isOlive } = useContext(ThemeContext);
  
  // Icon mapping for category names/types
  const iconMap = {
    'Technology': Code,
    'tech': Code,
    'software': Code,
    'Healthcare': Stethoscope,
    'health': Stethoscope,
    'medical': Stethoscope,
    'Education': GraduationCap,
    'education': GraduationCap,
    'teaching': GraduationCap,
    'Creative Arts': Palette,
    'creative': Palette,
    'design': Palette,
    'Business & Finance': BarChart3,
    'finance': BarChart3,
    'business': BarChart3,
    'marketing': BarChart3,
    'sales': BarChart3,
    'Skilled Trades': Wrench,
    'trades': Wrench,
    'manufacturing': Wrench,
    'Transportation': Truck,
    'transport': Truck,
    'logistics': Truck,
    'Hospitality': ChefHat,
    'hospitality': ChefHat,
    'restaurant': ChefHat,
    'Legal': Gavel,
    'legal': Gavel,
    'law': Gavel,
    'Construction': Building2,
    'construction': Building2,
    'building': Building2,
    'Accounting': Calculator,
    'accounting': Calculator,
    'Customer Service': Headphones,
    'customer': Headphones,
    'support': Headphones
  };

  // Function to get appropriate icon component
  const getIconComponent = (category) => {
    if (category.icon && typeof category.icon === 'function') {
      return category.icon; // It's already a React component
    }
    
    const categoryName = category.title || category.name || '';
    const categoryType = category.type || '';
    
    // Try to find icon by exact match first
    let IconComponent = iconMap[categoryName] || iconMap[categoryType];
    
    if (!IconComponent) {
      // Try partial matches
      const lowerName = categoryName.toLowerCase();
      const lowerType = categoryType.toLowerCase();
      
      for (const [key, icon] of Object.entries(iconMap)) {
        if (lowerName.includes(key.toLowerCase()) || lowerType.includes(key.toLowerCase())) {
          IconComponent = icon;
          break;
        }
      }
    }
    
    // Default fallback icon
    return IconComponent || Code;
  };
  
  // Default categories with static data as fallback
  const defaultCategories = [
    {
      title: 'Technology',
      icon: Code,
      jobCount: '25,847',
      averageSalary: '$95,000',
      growth: '+15%',
      color: isOlive ? 'from-olive-beige to-raisin-black' : 'from-blue-500 to-cyan-400',
      bgColor: isOlive ? 'bg-olive-beige/5' : 'bg-blue-50',
      popular: ['Software Engineer', 'Data Scientist', 'Product Manager', 'DevOps Engineer']
    },
    {
      title: 'Healthcare',
      icon: Stethoscope,
      jobCount: '18,934',
      averageSalary: '$78,000',
      growth: '+12%',
      color: 'from-red-500 to-pink-400',
      bgColor: 'bg-red-50',
      popular: ['Registered Nurse', 'Medical Assistant', 'Physician', 'Physical Therapist']
    },
    {
      title: 'Education',
      icon: GraduationCap,
      jobCount: '14,567',
      averageSalary: '$52,000',
      growth: '+8%',
      color: 'from-green-500 to-emerald-400',
      bgColor: 'bg-green-50',
      popular: ['Elementary Teacher', 'Professor', 'Principal', 'Special Education']
    },
    {
      title: 'Creative Arts',
      icon: Palette,
      jobCount: '9,234',
      averageSalary: '$65,000',
      growth: '+18%',
      color: 'from-purple-500 to-pink-400',
      bgColor: 'bg-purple-50',
      popular: ['Graphic Designer', 'UX Designer', 'Photographer', 'Video Editor']
    },
    {
      title: 'Business & Finance',
      icon: BarChart3,
      jobCount: '21,456',
      averageSalary: '$85,000',
      growth: '+10%',
      color: 'from-yellow-500 to-orange-400',
      bgColor: 'bg-yellow-50',
      popular: ['Financial Analyst', 'Marketing Manager', 'Sales Director', 'Accountant']
    },
    {
      title: 'Skilled Trades',
      icon: Wrench,
      jobCount: '16,789',
      averageSalary: '$62,000',
      growth: '+14%',
      color: 'from-orange-500 to-red-400',
      bgColor: 'bg-orange-50',
      popular: ['Electrician', 'Plumber', 'Carpenter', 'HVAC Technician']
    },
    {
      title: 'Transportation',
      icon: Truck,
      jobCount: '12,345',
      averageSalary: '$55,000',
      growth: '+9%',
      color: 'from-indigo-500 to-blue-400',
      bgColor: 'bg-indigo-50',
      popular: ['Truck Driver', 'Pilot', 'Logistics Manager', 'Fleet Coordinator']
    },
    {
      title: 'Hospitality',
      icon: ChefHat,
      jobCount: '19,678',
      averageSalary: '$42,000',
      growth: '+11%',
      color: 'from-pink-500 to-rose-400',
      bgColor: 'bg-pink-50',
      popular: ['Chef', 'Hotel Manager', 'Event Coordinator', 'Restaurant Manager']
    },
    {
      title: 'Legal',
      icon: Gavel,
      jobCount: '7,892',
      averageSalary: '$125,000',
      growth: '+6%',
      color: 'from-gray-700 to-gray-500',
      bgColor: 'bg-gray-50',
      popular: ['Attorney', 'Paralegal', 'Legal Assistant', 'Judge']
    },
    {
      title: 'Construction',
      icon: Building2,
      jobCount: '15,234',
      averageSalary: '$58,000',
      growth: '+13%',
      color: 'from-amber-600 to-yellow-500',
      bgColor: 'bg-amber-50',
      popular: ['Project Manager', 'Architect', 'Site Supervisor', 'Safety Inspector']
    },
    {
      title: 'Accounting',
      icon: Calculator,
      jobCount: '11,567',
      averageSalary: '$68,000',
      growth: '+7%',
      color: 'from-teal-500 to-cyan-400',
      bgColor: 'bg-teal-50',
      popular: ['CPA', 'Bookkeeper', 'Tax Specialist', 'Auditor']
    },
    {
      title: 'Customer Service',
      icon: Headphones,
      jobCount: '22,890',
      averageSalary: '$38,000',
      growth: '+5%',
      color: 'from-violet-500 to-purple-400',
      bgColor: 'bg-violet-50',
      popular: ['Support Representative', 'Call Center Agent', 'Customer Success', 'Help Desk']
    }
  ];

  // Use provided categories data or fall back to default
  const categories = categoriesData || defaultCategories;

  return (
    <section className={`py-24 relative overflow-hidden transition-all duration-500 ${
      isOlive ? 'bg-white' : 'bg-white'
    }`}>
      {/* Background Pattern */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${
        isOlive 
          ? "bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23B5A642%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"
          : "bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23f3f4f6%22 fill-opacity=%220.4%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"
      }`}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16" data-animate>
          <h2 className={`text-5xl font-black mb-6 transition-colors duration-500 ${
            isOlive ? 'text-raisin-black' : 'text-gray-900'
          }`}>
            Explore by <span className={`text-transparent bg-clip-text transition-all duration-500 ${
              isOlive 
                ? 'bg-gradient-to-r from-olive-beige to-raisin-black' 
                : 'bg-gradient-to-r from-purple-600 to-pink-600'
            }`}>Category</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto transition-colors duration-500 ${
            isOlive ? 'text-raisin-black/70' : 'text-gray-600'
          }`}>
            Discover opportunities across every industry. From tech startups to healthcare institutions, your perfect career awaits.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={category.title || category.name || index}
              className={`group ${category.bgColor || 'bg-gray-50'} rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 border relative overflow-hidden ${
                isOlive 
                  ? 'border-olive-beige/10 hover:border-olive-beige/30' 
                  : 'border-gray-100 hover:border-gray-200'
              }`}
              data-animate
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Gradient on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color || 'from-gray-500 to-gray-600'} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
              
              <div className="relative z-10">
                {/* Icon and Growth Badge */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${category.color || 'from-gray-500 to-gray-600'} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {React.createElement(getIconComponent(category), { className: "h-8 w-8 text-white" })}
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                    {category.growth || '+5%'}
                  </span>
                </div>

                {/* Category Info */}
                <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                  isOlive ? 'text-raisin-black group-hover:text-raisin-black/80' : 'text-gray-900 group-hover:text-gray-700'
                }`}>
                  {category.title || category.name || 'Category'}
                </h3>

                {/* Stats */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className={`text-sm transition-colors duration-300 ${
                      isOlive ? 'text-raisin-black/70' : 'text-gray-600'
                    }`}>Available Jobs</span>
                    <span className={`font-bold transition-colors duration-300 ${
                      isOlive ? 'text-raisin-black' : 'text-gray-900'
                    }`}>{category.jobCount || category.count || '1,000+'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm transition-colors duration-300 ${
                      isOlive ? 'text-raisin-black/70' : 'text-gray-600'
                    }`}>Avg. Salary</span>
                    <span className={`font-bold transition-colors duration-300 ${
                      isOlive ? 'text-raisin-black' : 'text-gray-900'
                    }`}>{category.averageSalary || category.salary || '$50,000'}</span>
                  </div>
                </div>

                {/* Popular Roles */}
                <div className="mb-6">
                  <h4 className={`text-sm font-semibold mb-3 transition-colors duration-300 ${
                    isOlive ? 'text-raisin-black' : 'text-gray-700'
                  }`}>Popular Roles:</h4>
                  <div className="space-y-2">
                    {(category.popular || ['Entry Level', 'Mid Level', 'Senior Level']).slice(0, 3).map((role, idx) => (
                      <div key={idx} className={`text-sm transition-colors duration-300 ${
                        isOlive ? 'text-raisin-black/70 hover:text-raisin-black' : 'text-gray-600 hover:text-gray-800'
                      }`}>
                        • {role}
                      </div>
                    ))}
                  </div>
                </div>

                {/* View Jobs Button */}
                <button className={`w-full bg-gradient-to-r ${category.color || 'from-gray-500 to-gray-600'} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform group-hover:scale-105`}>
                  Browse Jobs
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16" data-animate>
          <p className={`text-lg mb-8 transition-colors duration-500 ${
            isOlive ? 'text-raisin-black/70' : 'text-gray-600'
          }`}>
            Can't find your industry? We have opportunities in <span className={`font-bold transition-colors duration-500 ${
              isOlive ? 'text-olive-beige' : 'text-purple-600'
            }`}>50+ categories</span>
          </p>
          <button className={`text-white px-12 py-4 rounded-full text-lg font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
            isOlive 
              ? 'bg-gradient-to-r from-olive-beige to-raisin-black hover:from-olive-beige/90 hover:to-raisin-black/90' 
              : 'bg-gradient-to-r from-purple-600 to-pink-600'
          }`}>
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default JobCategories;
