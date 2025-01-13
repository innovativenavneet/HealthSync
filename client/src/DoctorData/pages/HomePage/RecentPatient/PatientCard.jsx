import patientAvatar from '../../../../assets/images/patientAvatar.png';

const PatientCard = ({ patient, onAddNote, onViewMore }) => (
  <div className="relative overflow-hidden w-[560px] h-[70px] bg-white rounded-[7px] border border-gray-300 mb-4 flex items-center">
    {/* Patient Image */}
    <div className="w-[44px] h-[44px] rounded-full bg-gray-200 flex-shrink-0 ml-4 overflow-hidden">
      <img 
        src={patient.image || patientAvatar} // Placeholder if image is missing
        alt={`${patient.name}'s avatar`} 
        className="w-full h-full object-cover" 
      />
    </div>

    {/* Patient Details */}
    <div className="ml-4">
      <p className="text-lg font-semibold text-black">{patient.name}</p>
      <p className="text-sm text-gray-800">
        Age: {patient.age} | Complaint: {patient.complaint}
      </p>
    </div>

    {/* Action Buttons */}
    <div className="ml-auto mr-4 flex flex-col items-end">
      <button
        onClick={() => onAddNote(patient)}
        className="w-[74px] h-[20px] border border-gray-300 bg-blue-500 text-white rounded-[4px] mb-2 text-xs"
      >
        Add Note
      </button>
      <button
        onClick={() => onViewMore(patient)}
        className="w-[74px] h-[20px] text-xs border border-gray-300 bg-gray-200 text-black rounded-[4px]"
      >
        View More
      </button>
    </div>
  </div>
);

export default PatientCard;




  