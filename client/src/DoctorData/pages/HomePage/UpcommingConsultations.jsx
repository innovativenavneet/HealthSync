const UpcomingConsultations = () => {
    return (
      <section className="bg-white p-1 rounded-lg shadow-lg w-[650px] h-[220px] border border-gray-300 ml-4">
        <header>
          <h2 className="text-2xl font-semibold text-black px-4 py-2 rounded-t-md">
            Upcoming Consultations
          </h2>
        </header>
        <div className="h-36 flex items-center justify-center">
          <p className="text-gray-500">No upcoming consultations.</p>
        </div>
      </section>
    );
  };
  
  export default UpcomingConsultations;
  