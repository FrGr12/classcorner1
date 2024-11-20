const TrustedBy = () => {
  const testimonials = [
    { name: "Sarah M.", role: "Ceramics Teacher", className: "w-24" },
    { name: "John D.", role: "Cooking Instructor", className: "w-28" },
    { name: "Emma P.", role: "Watercolor Artist", className: "w-28" },
    { name: "Michael R.", role: "Woodworking Expert", className: "w-24" }
  ];

  return (
    <section className="py-24 bg-neutral-200/50">
      <div className="container-padding">
        <p className="text-center text-neutral-600 mb-12">Trusted by creative instructors across the country</p>
        <div className="flex flex-wrap justify-center items-center gap-12">
          {testimonials.map((person) => (
            <div key={person.name} className="text-center">
              <div className={`${person.className} h-8 bg-neutral-400/20 rounded-lg mb-2`} />
              <p className="font-medium">{person.name}</p>
              <p className="text-sm text-neutral-600">{person.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;