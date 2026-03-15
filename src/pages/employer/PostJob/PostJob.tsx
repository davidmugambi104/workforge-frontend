import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BriefcaseIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  EyeIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  PlusIcon,
  TrashIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { useCreateJob } from '@hooks/useEmployerJobs';
import { skillService } from '@services/job.service';
import { Input } from '@components/ui/Input';
import { Textarea } from '@components/ui/Textarea';

// Steps Configuration
const steps = [
  { id: 'basic', label: 'Basic Info', icon: BriefcaseIcon },
  { id: 'details', label: 'Details', icon: DocumentTextIcon },
  { id: 'compensation', label: 'Compensation', icon: CurrencyDollarIcon },
  { id: 'location', label: 'Location', icon: MapPinIcon },
  { id: 'preview', label: 'Preview', icon: EyeIcon },
];

// Form Field Component
interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ label, required, error, children }) => (
  <div className="mb-5">
    <label className="block text-sm font-semibold text-charcoal mb-2">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {children}
    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
  </div>
);

// Step Indicator
const StepIndicator: React.FC<{ currentStep: number }> = ({ currentStep }) => (
  <div className="mb-8">
    <div className="flex items-center justify-between mb-3">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-xl text-sm font-semibold transition-all ${
            index < currentStep 
              ? 'bg-emerald-500 text-white' 
              : index === currentStep 
                ? 'bg-navy text-white' 
                : 'bg-charcoal-100 text-charcoal-400'
          }`}>
            {index < currentStep ? (
              <CheckCircleIcon className="w-5 h-5" />
            ) : (
              <step.icon className="w-5 h-5" />
            )}
          </div>
          {index < steps.length - 1 && (
            <div className={`w-16 lg:w-24 h-0.5 mx-2 ${
              index < currentStep ? 'bg-emerald-500' : 'bg-charcoal-200'
            }`} />
          )}
        </div>
      ))}
    </div>
    <div className="flex justify-between">
      {steps.map((step, index) => (
        <span key={step.id} className={`text-xs lg:text-sm ${
          index === currentStep ? 'text-navy font-medium' : 'text-muted'
        }`}>
          {step.label}
        </span>
      ))}
    </div>
  </div>
);

// Basic Info Step
const BasicInfoStep: React.FC<{ 
  formData: any; 
  updateFormData: (data: any) => void;
  errors: any;
}> = ({ formData, updateFormData, errors }) => (
  <div className="animate-fade-in-up">
    <h3 className="text-lg font-semibold text-charcoal mb-1">Basic Information</h3>
    <p className="text-sm text-muted mb-6">Start with the fundamentals of your job listing</p>

    <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-sm text-slate-600">
      Use a clear, searchable title and category so the right workers can find this job quickly.
    </div>

    <FormField label="Job Title" required error={errors.title}>
      <Input
        type="text"
        value={formData.title}
        onChange={(e) => updateFormData({ title: e.target.value })}
        placeholder="e.g. Senior Electrician"
        hint="Avoid vague titles like 'Worker Needed'."
      />
    </FormField>

    <FormField label="Job Category" required error={errors.category}>
      <div className="relative">
        <select
          value={formData.category}
          onChange={(e) => updateFormData({ category: e.target.value })}
          className="input-field appearance-none pr-10"
        >
          <option value="">Select a category</option>
          <option value="electrical">Electrical</option>
          <option value="plumbing">Plumbing</option>
          <option value="hvac">HVAC</option>
          <option value="carpentry">Carpentry</option>
          <option value="welding">Welding</option>
          <option value="masonry">Masonry</option>
          <option value="painting">Painting</option>
          <option value="roofing">Roofing</option>
        </select>
        <ChevronDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
      </div>
    </FormField>

    <FormField label="Employment Type" required error={errors.type}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship'].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => updateFormData({ type })}
            className={`p-3 rounded-lg border text-sm font-medium transition-all ${
              formData.type === type
                ? 'border-navy bg-navy text-white'
                : 'border-charcoal-200 text-charcoal-600 hover:border-navy'
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </FormField>

    <FormField label="Experience Level" required error={errors.experience}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {['Entry', 'Mid', 'Senior', 'Lead'].map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => updateFormData({ experience: level })}
            className={`p-3 rounded-lg border text-sm font-medium transition-all ${
              formData.experience === level
                ? 'border-navy bg-navy text-white'
                : 'border-charcoal-200 text-charcoal-600 hover:border-navy'
            }`}
          >
            {level}
          </button>
        ))}
      </div>
    </FormField>
  </div>
);

// Details Step
const DetailsStep: React.FC<{ 
  formData: any; 
  updateFormData: (data: any) => void;
  errors: any;
}> = ({ formData, updateFormData, errors }) => (
  <div className="animate-fade-in-up">
    <h3 className="text-lg font-semibold text-charcoal mb-1">Job Details</h3>
    <p className="text-sm text-muted mb-6">Describe responsibilities and requirements</p>

    <FormField label="Job Description" required error={errors.description}>
      <Textarea
        value={formData.description}
        onChange={(e) => updateFormData({ description: e.target.value })}
        className="min-h-[180px] resize-none"
        placeholder="Describe the role, responsibilities, and what makes this opportunity great..."
        hint="Include daily duties, work conditions, and the expected outcome."
      />
      <p className="text-xs text-muted mt-1">{formData.description.length}/5000 characters</p>
    </FormField>

    <FormField label="Requirements" required error={errors.requirements}>
      <Textarea
        value={formData.requirements}
        onChange={(e) => updateFormData({ requirements: e.target.value })}
        className="min-h-[140px] resize-none"
        placeholder="List the skills, certifications, and experience required..."
        hint="Separate must-haves from nice-to-haves for better applications."
      />
    </FormField>

    <FormField label="Benefits">
      <div className="space-y-2">
        {formData.benefits.map((benefit: string, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={benefit}
              onChange={(e) => {
                const newBenefits = [...formData.benefits];
                newBenefits[index] = e.target.value;
                updateFormData({ benefits: newBenefits });
              }}
              className="input-field"
              placeholder="e.g. Health Insurance"
            />
            {formData.benefits.length > 1 && (
              <button
                type="button"
                onClick={() => {
                  const newBenefits = formData.benefits.filter((_: any, i: number) => i !== index);
                  updateFormData({ benefits: newBenefits });
                }}
                className="icon-btn text-red-500"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => updateFormData({ benefits: [...formData.benefits, ''] })}
          className="flex items-center gap-2 text-sm text-navy font-medium hover:underline"
        >
          <PlusIcon className="w-4 h-4" />
          Add Benefit
        </button>
      </div>
    </FormField>
  </div>
);

// Compensation Step
const CompensationStep: React.FC<{ 
  formData: any; 
  updateFormData: (data: any) => void;
  errors: any;
}> = ({ formData, updateFormData, errors }) => (
  <div className="animate-fade-in-up">
    <h3 className="text-lg font-semibold text-charcoal mb-1">Compensation</h3>
    <p className="text-sm text-muted mb-6">Set competitive pay rates</p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <FormField label="Minimum Pay" required error={errors.payMin}>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">$</span>
          <Input
            type="number"
            value={formData.payMin}
            onChange={(e) => updateFormData({ payMin: e.target.value })}
            className="pl-8"
            placeholder="25"
            hint="Set the lowest amount you can confidently offer."
          />
        </div>
      </FormField>

      <FormField label="Maximum Pay" required error={errors.payMax}>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">$</span>
          <Input
            type="number"
            value={formData.payMax}
            onChange={(e) => updateFormData({ payMax: e.target.value })}
            className="pl-8"
            placeholder="35"
            hint="A clear range gets more qualified applicants."
          />
        </div>
      </FormField>
    </div>

    <FormField label="Pay Period" required error={errors.payPeriod}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {['Hourly', 'Weekly', 'Bi-weekly', 'Monthly'].map((period) => (
          <button
            key={period}
            type="button"
            onClick={() => updateFormData({ payPeriod: period })}
            className={`p-3 rounded-lg border text-sm font-medium transition-all ${
              formData.payPeriod === period
                ? 'border-navy bg-navy text-white'
                : 'border-charcoal-200 text-charcoal-600 hover:border-navy'
            }`}
          >
            {period}
          </button>
        ))}
      </div>
    </FormField>

    <FormField label="Pay Includes">
      <div className="grid grid-cols-2 gap-3">
        {['Overtime', 'Bonuses', 'Tips', 'Commission'].map((item) => (
          <label key={item} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.payIncludes.includes(item)}
              onChange={(e) => {
                const includes = e.target.checked
                  ? [...formData.payIncludes, item]
                  : formData.payIncludes.filter((i: string) => i !== item);
                updateFormData({ payIncludes: includes });
              }}
              className="w-5 h-5 rounded border-charcoal-300 text-navy focus:ring-navy"
            />
            <span className="text-sm text-charcoal">{item}</span>
          </label>
        ))}
      </div>
    </FormField>
  </div>
);

// Location Step
const LocationStep: React.FC<{ 
  formData: any; 
  updateFormData: (data: any) => void;
  errors: any;
}> = ({ formData, updateFormData, errors }) => (
  <div className="animate-fade-in-up">
    <h3 className="text-lg font-semibold text-charcoal mb-1">Location</h3>
    <p className="text-sm text-muted mb-6">Where will the work take place?</p>

    <FormField label="Work Location Type" required error={errors.locationType}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { id: 'onsite', label: 'On-site', desc: 'Physical location' },
          { id: 'remote', label: 'Remote', desc: 'Work from home' },
          { id: 'hybrid', label: 'Hybrid', desc: 'Mix of both' },
        ].map((type) => (
          <button
            key={type.id}
            type="button"
            onClick={() => updateFormData({ locationType: type.id })}
            className={`p-4 rounded-lg border text-left transition-all ${
              formData.locationType === type.id
                ? 'border-navy bg-navy-50'
                : 'border-charcoal-200 hover:border-navy'
            }`}
          >
            <p className={`font-medium ${formData.locationType === type.id ? 'text-navy' : 'text-charcoal'}`}>
              {type.label}
            </p>
            <p className="text-xs text-muted mt-0.5">{type.desc}</p>
          </button>
        ))}
      </div>
    </FormField>

    <FormField label="City" required error={errors.city}>
      <Input
        type="text"
        value={formData.city}
        onChange={(e) => updateFormData({ city: e.target.value })}
        placeholder="e.g. Dallas"
        hint="Use the main city workers will search for."
      />
    </FormField>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <FormField label="State" required error={errors.state}>
        <div className="relative">
          <select
            value={formData.state}
            onChange={(e) => updateFormData({ state: e.target.value })}
            className="input-field appearance-none pr-10"
          >
            <option value="">Select state</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>
          <ChevronDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
        </div>
      </FormField>

      <FormField label="ZIP Code" required error={errors.zip}>
        <Input
          type="text"
          value={formData.zip}
          onChange={(e) => updateFormData({ zip: e.target.value })}
          placeholder="e.g. 75001"
        />
      </FormField>
    </div>
  </div>
);

// Preview Step
const PreviewStep: React.FC<{ formData: any }> = ({ formData }) => (
  <div className="animate-fade-in-up">
    <h3 className="text-lg font-semibold text-charcoal mb-1">Preview</h3>
    <p className="text-sm text-muted mb-6">Review your job listing before publishing</p>

    <div className="solid-card overflow-hidden">
      {/* Header */}
      <div className="h-24 bg-gradient-to-r from-navy-600 to-navy-800 relative">
        <div className="absolute bottom-4 left-6">
          <span className="badge-success">Active</span>
        </div>
      </div>
      
      <div className="px-6 pb-6">
        <div className="flex items-start justify-between -mt-8 mb-4">
          <div className="w-16 h-16 rounded-xl bg-navy flex items-center justify-center text-white font-bold text-xl">
            WF
          </div>
        </div>

        <h2 className="text-xl font-bold text-charcoal">{formData.title || 'Untitled Job'}</h2>
        <p className="text-muted mt-1">{formData.category} • {formData.type} • {formData.experience} Level</p>

        <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted">
          <span className="flex items-center gap-1">
            <CurrencyDollarIcon className="w-4 h-4" />
            ${formData.payMin}-{formData.payMax}/{formData.payPeriod?.toLowerCase() || 'hourly'}
          </span>
          <span className="flex items-center gap-1">
            <MapPinIcon className="w-4 h-4" />
            {formData.city}, {formData.state} {formData.zip}
          </span>
        </div>

        <div className="mt-6 pt-6 border-t border-charcoal-100">
          <h4 className="font-semibold text-charcoal mb-2">Description</h4>
          <p className="text-sm text-charcoal whitespace-pre-line">{formData.description || 'No description provided.'}</p>
        </div>

        {formData.requirements && (
          <div className="mt-4">
            <h4 className="font-semibold text-charcoal mb-2">Requirements</h4>
            <p className="text-sm text-charcoal whitespace-pre-line">{formData.requirements}</p>
          </div>
        )}

        {formData.benefits.length > 0 && formData.benefits[0] && (
          <div className="mt-4">
            <h4 className="font-semibold text-charcoal mb-2">Benefits</h4>
            <div className="flex flex-wrap gap-2">
              {formData.benefits.filter((b: string) => b).map((benefit: string, i: number) => (
                <span key={i} className="badge-info">{benefit}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

// Main PostJob Component
const PostJob = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const createJobMutation = useCreateJob();
  const { data: skills = [] } = useQuery({
    queryKey: ['skillsForPostJob'],
    queryFn: () => skillService.getSkills(),
  });
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    type: '',
    experience: '',
    description: '',
    requirements: '',
    benefits: [''],
    payMin: '',
    payMax: '',
    payPeriod: 'Hourly',
    payIncludes: [] as string[],
    locationType: 'onsite',
    city: '',
    state: '',
    zip: '',
  });

  const updateFormData = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }));
    // Clear related errors
    const newErrors = { ...errors };
    Object.keys(data).forEach(key => delete newErrors[key]);
    setErrors(newErrors);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: any = {};
    
    switch (step) {
      case 0:
        if (!formData.title) newErrors.title = 'Job title is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.type) newErrors.type = 'Employment type is required';
        if (!formData.experience) newErrors.experience = 'Experience level is required';
        break;
      case 1:
        if (!formData.description) newErrors.description = 'Description is required';
        if (!formData.requirements) newErrors.requirements = 'Requirements are required';
        break;
      case 2:
        if (!formData.payMin) newErrors.payMin = 'Minimum pay is required';
        if (!formData.payMax) newErrors.payMax = 'Maximum pay is required';
        if (Number(formData.payMin) > Number(formData.payMax)) {
          newErrors.payMax = 'Maximum pay must be greater than or equal to minimum pay';
        }
        break;
      case 3:
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.zip) newErrors.zip = 'ZIP code is required';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    const selectedSkill = skills.find((skill) => skill.name.toLowerCase() === formData.category.toLowerCase());

    try {
      await createJobMutation.mutateAsync({
        title: formData.title,
        description: formData.description,
        required_skill_id: selectedSkill?.id || skills[0]?.id || 1,
        address: `${formData.city}, ${formData.state} ${formData.zip}`.trim(),
        pay_min: Number(formData.payMin || 0),
        pay_max: Number(formData.payMax || 0),
        pay_type: formData.payPeriod.toLowerCase().includes('hour')
          ? 'hourly'
          : formData.payPeriod.toLowerCase().includes('week')
            ? 'daily'
            : 'fixed',
      } as any);
      navigate('/employer/jobs');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in-up">
      {/* Page Header */}
      <div className="page-header mb-6">
        <div>
          <h1 className="page-title">Post a Job</h1>
          <p className="page-subtitle">Create a new job listing in 5 easy steps</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-3">
          <div className="solid-card p-6">
            <StepIndicator currentStep={currentStep} />
            
            {currentStep === 0 && <BasicInfoStep formData={formData} updateFormData={updateFormData} errors={errors} />}
            {currentStep === 1 && <DetailsStep formData={formData} updateFormData={updateFormData} errors={errors} />}
            {currentStep === 2 && <CompensationStep formData={formData} updateFormData={updateFormData} errors={errors} />}
            {currentStep === 3 && <LocationStep formData={formData} updateFormData={updateFormData} errors={errors} />}
            {currentStep === 4 && <PreviewStep formData={formData} />}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-charcoal-100">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="btn-secondary disabled:opacity-50"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                Previous
              </button>
              
              {currentStep < steps.length - 1 ? (
                <button type="button" onClick={handleNext} className="btn-primary">
                  Next
                  <ArrowRightIcon className="w-5 h-5" />
                </button>
              ) : (
                <button 
                  type="button" 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="btn-primary"
                >
                  {isSubmitting ? 'Publishing...' : 'Publish Job'}
                  <CheckCircleIcon className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Tips */}
        <div className="space-y-4">
          <div className="solid-card p-5">
            <h4 className="font-semibold text-charcoal mb-3">Tips for Success</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2">
                <CheckCircleIcon className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                Use a clear, specific job title
              </li>
              <li className="flex items-start gap-2">
                <CheckCircleIcon className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                Include competitive pay rates
              </li>
              <li className="flex items-start gap-2">
                <CheckCircleIcon className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                List all required certifications
              </li>
              <li className="flex items-start gap-2">
                <CheckCircleIcon className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                Add benefits to attract talent
              </li>
            </ul>
          </div>

          <div className="solid-card p-5">
            <h4 className="font-semibold text-charcoal mb-3">Need Help?</h4>
            <p className="text-sm text-muted mb-3">Our team can help you create an effective job listing.</p>
            <button
              type="button"
              onClick={() => window.open('mailto:support@workforge.app?subject=Help%20with%20job%20listing', '_self')}
              className="btn-secondary w-full text-sm"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
