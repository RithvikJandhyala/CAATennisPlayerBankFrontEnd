const school_details = [
    { name: "BASIS Scottsdale", image: "BScottsdale.png" },
    { name: 'BASIS Mesa', image: "BMesa.png" },
    { name: 'BASIS Ahwatukee', image: "BAhwatukee.png" },
    { name: 'Heritage Academy Maricopa', image: "HAM.png" },
    { name: 'Heritage Academy Mesa', image: "HMesa.png" },
    { name: 'Benjamin Franklin Charter', image: "BFC.png" },
    { name: 'ALA Gilbert North', image: "ALAGN.png" },
    { name: 'BASIS Prescott', image: "BPrescott.png" },
    { name: 'Tri-City Christian', image: "TCC.png" },
   
]
class SchoolService {
    getSchoolImg(school){        
        return  school_details.find(myschool => myschool.name === school).image;
    }    
}
export default new SchoolService()