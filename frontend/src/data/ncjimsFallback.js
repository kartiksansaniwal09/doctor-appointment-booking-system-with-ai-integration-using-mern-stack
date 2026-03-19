const instituteAddress = {
  line1: 'Jindal Institute of Medical Sciences',
  line2: 'Model Town, Hisar - 125005, Haryana'
}

export const ncjimsInstituteProfile = {
  name: 'Jindal Institute of Medical Sciences',
  shortName: 'NCJIMS / O.P. Jindal',
  appName: 'Appointex',
  address: instituteAddress,
  phone: '01662-310201',
  reserveNumbers: ['9896539128', '9896471111'],
  emergency: '24 Hrs Emergency Available',
  whatsappBooking: 'https://wa.me/919896471111?text=Hii',
  departmentsPage: 'https://www.ncjims.org/departments.html',
  locationPage: 'https://www.ncjims.org/location_map.html'
}

const departmentCatalog = {
  'Medical Oncology': {
    headline: 'Cancer consultation, chemotherapy planning, and palliative oncology support.',
    facilities: ['Preventive Oncology', 'Chemotherapy', 'PICC Line', 'In-house Onco Pharmacy', 'Daycare Ward', 'Palliative Care']
  },
  'Surgical Oncology': {
    headline: 'Operative cancer care for complex oncological procedures.',
    facilities: ['Whipple procedures', 'Esophagectomy', 'Wertheim surgery', 'Bronchoscopy', 'Laryngectomy']
  },
  'Radiation Oncology': {
    headline: 'Radiotherapy planning with IGRT, SRS, VMAT, and brachytherapy support.',
    facilities: ['HDR brachytherapy', 'IGRT / SRS / VMAT Linac', 'Monaco treatment planning']
  },
  'Cardio Thoracic and Vascular Surgery': {
    headline: 'Cardiac and vascular surgery services with post-op ICU support.',
    facilities: ['CABG Surgery', 'Valve Surgery', 'Cardiac Surgery ICU', 'Cardiac Ambulance']
  },
  'Cardiology': {
    headline: 'Heart consultation, diagnostics, angiography, angioplasty, and preventive cardiology.',
    facilities: ['Cath Lab', 'Angiography', 'Angioplasty', 'Pacemaker support', 'Holter', 'Echo', 'TMT']
  },
  'Neuro Surgery': {
    headline: 'Brain and spine surgical care with trauma and neuro support.',
    facilities: ['Brain Microsurgery', 'Spinal Cord Surgery', 'Brain Tumour Surgery', 'Skull Base Surgery', '24 Hrs Trauma Support']
  },
  'Neurology': {
    headline: 'Stroke, epilepsy, neurophysiology, and neuro-rehabilitation support.',
    facilities: ['Stroke emergency care', 'EEG and EMG', 'TMS', 'Sleep Neurology', 'Stroke rehabilitation']
  },
  'Gastroenterology': {
    headline: 'Digestive disease evaluation with endoscopy and ERCP services.',
    facilities: ['ERCP', 'Diagnostic Endoscopies', 'Therapeutic Endoscopies', 'Oesophageal Stents']
  },
  'GI Surgery': {
    headline: 'Surgical evaluation for gastrointestinal conditions.',
    facilities: ['All kinds of GI Surgery']
  },
  'Pulmonology': {
    headline: 'Respiratory consultation for cough, breathing, and lung disorders.',
    facilities: ['Bronchoscopy', 'Spirometry']
  },
  'Nephrology': {
    headline: 'Kidney care, renal monitoring, dialysis, and kidney biopsy support.',
    facilities: ['10 beded dialysis unit', 'Kidney Biopsy']
  },
  'Urology': {
    headline: 'Stone, prostate, bladder, and urinary tract treatment pathways.',
    facilities: ['PCNL', 'URS', 'TURP', 'RIRS', 'Urethroplasty', 'Urological cancer treatment']
  },
  'Plastic & Reconstructive Surgery': {
    headline: 'Burn, reconstructive, cosmetic, and cleft care support.',
    facilities: ['Burns Unit', 'Burns ICU', 'Flap surgery', 'Cosmetic Surgery', 'Cleft care']
  },
  'Gen. Surgery & Bariatric Surgery': {
    headline: 'General surgery and bariatric evaluation with laparoscopy support.',
    facilities: ['Bariatric Surgery', 'Laparoscopic Surgery', 'Colonoscopy', 'High Dependency Unit']
  },
  'Internal Medicine': {
    headline: 'General physician and adult medicine evaluation for undifferentiated symptoms.',
    facilities: ['Echocardiography', 'TMT / EEG', 'Video Endoscopy', 'Dialysis']
  },
  'Orthopedics': {
    headline: 'Joint, fracture, sports injury, and replacement care pathways.',
    facilities: ['Arthroscopy', 'Arthroplasty', 'Knee Replacement', 'Hip Replacement']
  },
  'Pediatrics': {
    headline: 'Child consultation, newborn care, vaccination, and pediatric support.',
    facilities: ['Vaccination', 'Neo-Natal ICU', 'Pediatric Ventilators', 'Phototherapy', 'EEG']
  },
  'Ophthalmology': {
    headline: 'Eye consultation, retina, cornea, and laser eye care.',
    facilities: ['Lasik Laser', 'Cornea Transplant', 'Vitrectomy', 'Retina Clinic', 'Fundus Angiography']
  },
  'ENT, Head and Neck Surgery': {
    headline: 'Ear, nose, throat, head and neck consultation and surgery.',
    facilities: ['Cochlear Implant', 'FESS', 'Nasal Endoscopy', 'Micro Ear Surgery', 'Flexible Laryngoscopy']
  },
  'Gynae & Obs.': {
    headline: 'Women’s health, pregnancy care, labor room, and gynecology support.',
    facilities: ['Delivery Suite', 'Painless Delivery', 'Hysteroscopy', 'Colposcopy', 'Laparoscopic Surgeries']
  },
  'Dermatology': {
    headline: 'Skin, hair, pigment, biopsy, and laser dermatology support.',
    facilities: ['Skin Biopsy', 'Blister Grafting', 'Hair Remover Laser', 'Electrolysis']
  },
  'Psychiatry': {
    headline: 'Mental health consultation, clinical psychology, and behavioural support.',
    facilities: ['ECT', 'Biofeedback', 'Multi-behaviour therapy', 'Clinical Psychology']
  },
  'Dental Surgery': {
    headline: 'Dental consultation, surgery, orthodontics, and maxillofacial support.',
    facilities: ['Root Canal Treatment', 'Tooth Extraction', 'Maxillofacial Surgery', 'Orthodontic Treatment']
  },
  'Anaesthesia, Critical Care & Pain': {
    headline: 'Operation theatre anesthesia support, pain clinic, and perioperative care.',
    facilities: ['Intensive Care Unit', 'HVAC Operation Theaters', 'Pain Clinic', 'CSSD']
  },
  'Critical Care': {
    headline: 'ICU care support and intensive monitoring services.',
    facilities: ['Critical care support team']
  },
  'Radiodiagnosis & Interventional Neuro Radiology': {
    headline: 'Imaging and interventional diagnostics across CT, MRI, ultrasound, and mammography.',
    facilities: ['128 Slice CT Scan', '1.5 Tesla MRI', '3D Ultrasonography', 'Mammography', 'Color Doppler']
  },
  Physiotherapy: {
    headline: 'Rehabilitation and movement therapy support.',
    facilities: ['Manual Physiotherapy', 'TENS', 'Traction', 'Neuro-Muscle Stimulator']
  },
  'Paediatric Surgery': {
    headline: 'Surgical care for pediatric conditions including pediatric urology and onco surgery.',
    facilities: ['Paediatric Surgery', 'Pediatric Urology', 'Pediatric Onco Surgery']
  },
  Endocrinology: {
    headline: 'Hormone, thyroid, diabetes, growth, and metabolic disorder support.',
    facilities: ['Diabetes care', 'Thyroid disorders', 'PCOD', 'Growth concerns', 'Pituitary disorders']
  },
  'Nuclear Medicine': {
    headline: 'PET-CT imaging and nuclear medicine support.',
    facilities: ['PETCT Scan']
  }
}

const buildDoctor = ({
  _id,
  name,
  speciality,
  degree,
  image,
  opdDays = 'Please confirm with hospital desk',
  consultationModes = ['In-person OPD'],
  symptomFocus = [],
  secondarySpecialities = [],
  note = '',
  available = true
}) => ({
  _id,
  name,
  image: `https://www.ncjims.org/images/${image}`,
  speciality,
  degree,
  experience: `Consultant, ${speciality}`,
  about: `${departmentCatalog[speciality]?.headline || `${speciality} consultation support.`} Listed on the official NCJIMS department page.${note ? ` ${note}` : ''}`,
  fees: 0,
  available,
  opdDays,
  opdNote: opdDays === 'Please confirm with hospital desk' ? 'OPD timing not clearly published on the department page.' : `Official department page lists OPD as ${opdDays}.`,
  address: instituteAddress,
  hospital: 'Jindal Institute of Medical Sciences, Hisar',
  consultationModes,
  symptomFocus,
  secondarySpecialities,
  departmentFacilities: departmentCatalog[speciality]?.facilities || [],
  sourceUrl: ncjimsInstituteProfile.departmentsPage,
  languages: ['Hindi', 'English']
})

const rawDoctors = [
  { _id: 'ncjims1', name: 'Dr. Satya Narayan', speciality: 'Medical Oncology', degree: 'MD, DNB', image: 'dr_satyanarayan.jpg', opdDays: 'Monday to Saturday', symptomFocus: ['cancer review', 'chemotherapy', 'tumor care', 'oncology follow-up'] },
  { _id: 'ncjims2', name: 'Dr. Ramesh Kumar Kaswan', speciality: 'Surgical Oncology', degree: 'M.Ch. (Onco Surgeon)', image: 'dr_ramesh.jpg', opdDays: 'Monday to Saturday', symptomFocus: ['cancer surgery', 'oncology surgery', 'tumor surgery'] },
  { _id: 'ncjims3', name: 'Dr. Naveen Saini', speciality: 'Surgical Oncology', degree: 'M.Ch.', image: 'drnaveen_saini.jpg', opdDays: 'Monday to Saturday', symptomFocus: ['cancer surgery', 'oncology surgery'] },
  { _id: 'ncjims4', name: 'Dr. Abhijeet Tiwari', speciality: 'Radiation Oncology', degree: 'M.D. (Radiation Oncologist)', image: 'dr_abhijeet.png', opdDays: 'Monday to Saturday', symptomFocus: ['radiotherapy', 'cancer radiation', 'oncology treatment'] },
  { _id: 'ncjims5', name: 'Dr. Ashok Kumar Chahal', speciality: 'Cardio Thoracic and Vascular Surgery', degree: 'M.Ch.', image: 'dr_ashok.jpg', opdDays: 'Monday to Saturday', symptomFocus: ['cabg', 'valve disease', 'cardiac surgery'] },
  { _id: 'ncjims6', name: 'Dr. Neeraj Monga', speciality: 'Cardio Thoracic and Vascular Surgery', degree: 'M.D. (Cardiac Anaesthesia)', image: 'dr_neeraj.jpg', note: 'Listed under the CTVS department faculty on the official page.' },
  { _id: 'ncjims7', name: 'Dr. Animesh Agrawal', speciality: 'Cardiology', degree: 'DM', image: 'dr_animesh.jpg', opdDays: 'Monday, Wednesday, Friday', symptomFocus: ['chest pain', 'heart checkup', 'palpitations', 'shortness of breath'] },
  { _id: 'ncjims8', name: 'Dr. Deepak Bhardwaj', speciality: 'Cardiology', degree: 'DM', image: 'dr_bhardwaj.png', opdDays: 'Tuesday, Thursday, Saturday', symptomFocus: ['chest discomfort', 'bp review', 'cardiac follow-up'] },
  { _id: 'ncjims9', name: 'Dr. Vijay Kumar', speciality: 'Neuro Surgery', degree: 'M.Ch.', image: 'dr_vijay_kumar.jpg', opdDays: 'Monday to Saturday', symptomFocus: ['brain tumor', 'spine injury', 'neurosurgery', 'head injury'] },
  { _id: 'ncjims10', name: 'Dr. Pankaj Ailawadhi', speciality: 'Neuro Surgery', degree: 'M.Ch.', image: 'dr_pankaj_ailawadhi.png', opdDays: 'Monday to Saturday', symptomFocus: ['spine surgery', 'neurosurgery', 'brain surgery'] },
  { _id: 'ncjims11', name: 'Dr. Manisha Sharma', speciality: 'Neurology', degree: 'D.M.', image: 'DrManishaSharma.jpg', opdDays: 'Monday to Saturday', symptomFocus: ['seizure', 'stroke', 'headache', 'dizziness', 'numbness'] },
  { _id: 'ncjims12', name: 'Dr. Sunil Goel', speciality: 'Gastroenterology', degree: 'DM', image: 'dr_sunil.jpg', symptomFocus: ['acidity', 'stomach pain', 'indigestion', 'endoscopy'] },
  { _id: 'ncjims13', name: 'Dr. Parikh Sankalp', speciality: 'Gastroenterology', degree: 'DrNB', image: 'dr_parikhsankalp.jpg', symptomFocus: ['gi symptoms', 'liver issues', 'endoscopy'] },
  { _id: 'ncjims14', name: 'Dr. Neha Garg', speciality: 'Pulmonology', degree: 'MD, DNB', image: 'dr_neha_g.jpg', opdDays: 'Monday to Saturday', symptomFocus: ['cough', 'asthma', 'breathing issue', 'lung infection'] },
  { _id: 'ncjims15', name: 'Dr. Uma Shankar Gaur', speciality: 'Nephrology', degree: 'DM', image: 'dr_uma.jpg', opdDays: 'Monday to Saturday', symptomFocus: ['kidney issue', 'creatinine', 'dialysis', 'urine issue'] },
  { _id: 'ncjims16', name: 'Dr. Disha Arora', speciality: 'Nephrology', degree: 'DM', image: 'dr_dishaarora.jpg', note: 'Faculty listed on the nephrology page; OPD days were not clearly printed there.' },
  { _id: 'ncjims17', name: 'Dr. Sidharth Gupta', speciality: 'Urology', degree: 'M.Ch.', image: 'dr_sidharth.jpg', opdDays: 'Monday to Saturday', symptomFocus: ['kidney stone', 'prostate', 'blood in urine', 'burning urine'] },
  { _id: 'ncjims18', name: 'Dr. Raj Kumar Sharma', speciality: 'Urology', degree: 'M.Ch.', image: 'DrRajKumarSharma.jpg', opdDays: 'Monday to Saturday', symptomFocus: ['urinary issue', 'stone', 'urology surgery'] },
  { _id: 'ncjims19', name: 'Dr. Vikas Jain', speciality: 'Plastic & Reconstructive Surgery', degree: 'M.Ch.', image: 'dr_vikas.jpg', opdDays: 'Monday to Saturday' },
  { _id: 'ncjims20', name: 'Dr. Ravi Hissaria', speciality: 'Gen. Surgery & Bariatric Surgery', degree: 'MS', image: 'dr_ravi.png', opdDays: 'Monday, Wednesday, Friday', symptomFocus: ['hernia', 'gall bladder', 'bariatric', 'general surgery'] },
  { _id: 'ncjims21', name: 'Dr. Jatin Bedi', speciality: 'Gen. Surgery & Bariatric Surgery', degree: 'MS', image: 'dr_jatinbedi.jpg', opdDays: 'Tuesday, Thursday, Saturday', symptomFocus: ['lap surgery', 'general surgery', 'bariatric'] },
  { _id: 'ncjims22', name: 'Dr. Inderjeet Khurana', speciality: 'Internal Medicine', degree: 'DNB', image: 'dr_inderjeet_khurana.jpg', symptomFocus: ['fever', 'adult medicine', 'general physician', 'infection'] },
  { _id: 'ncjims23', name: 'Dr. Sandeep Chaudhary', speciality: 'Internal Medicine', degree: 'DNB', image: 'dr_sandeepc.jpg', symptomFocus: ['fever', 'weakness', 'adult medicine'] },
  { _id: 'ncjims24', name: 'Dr. Renu Duhan', speciality: 'Internal Medicine', degree: 'MD', image: 'dr_renu.jpg', symptomFocus: ['general medicine', 'routine illness'] },
  { _id: 'ncjims25', name: 'Dr. Naveen Kumar', speciality: 'Internal Medicine', degree: 'MD', image: 'drnaveen_kumar.jpg', symptomFocus: ['adult medicine', 'blood pressure', 'general symptoms'] },
  { _id: 'ncjims26', name: 'Dr. Pranav Singhal', speciality: 'Internal Medicine', degree: 'MD', image: 'dr_pranav_singhal.jpg', symptomFocus: ['general physician', 'fever', 'body pain'] },
  { _id: 'ncjims27', name: 'Dr. Sidharth Baheti', speciality: 'Orthopedics', degree: 'MS', image: 'dr_sidharth_baheti.jpg', opdDays: 'Monday, Wednesday, Friday', symptomFocus: ['joint pain', 'fracture', 'orthopedic review'] },
  { _id: 'ncjims28', name: 'Dr. Vishal Gupta', speciality: 'Orthopedics', degree: 'MS', image: 'dr_vishal_gupta.jpg', opdDays: 'Tuesday, Thursday, Saturday', symptomFocus: ['back pain', 'knee pain', 'orthopedic surgery'] },
  { _id: 'ncjims29', name: 'Dr. Sahil Girdhar', speciality: 'Orthopedics', degree: 'MS, DNB', image: 'dr_sahil_girdhar.jpg', opdDays: 'Tuesday, Wednesday, Friday, Saturday', symptomFocus: ['joint pain', 'shoulder pain', 'sports injury'] },
  { _id: 'ncjims30', name: 'Dr. Veena Gupta', speciality: 'Pediatrics', degree: 'MD', image: 'dr_veena.jpg', symptomFocus: ['child fever', 'vaccination', 'newborn'] },
  { _id: 'ncjims31', name: 'Dr. Astha Jain', speciality: 'Pediatrics', degree: 'MD', image: 'Dr_Astha_jain.jpg', opdDays: 'Monday to Saturday', symptomFocus: ['child cough', 'pediatric review', 'vaccination'] },
  { _id: 'ncjims32', name: 'Dr. Anjali Bisht', speciality: 'Pediatrics', degree: 'MD', image: 'Dr_Anjali_Bisht.jpg', opdDays: 'Monday to Saturday', symptomFocus: ['newborn care', 'child fever'] },
  { _id: 'ncjims33', name: 'Dr. Manu Siddharth', speciality: 'Pediatrics', degree: 'MD', image: 'Dr_Manu.jpg', opdDays: 'Monday to Saturday', symptomFocus: ['child health', 'pediatric follow-up'] },
  { _id: 'ncjims34', name: 'Dr. Sunil Agrawal', speciality: 'Ophthalmology', degree: 'M.S.', image: 'dr_sunil_aggarwal.jpg', symptomFocus: ['eye checkup', 'vision issue', 'retina review'] },
  { _id: 'ncjims35', name: 'Dr. Parveen Monga', speciality: 'Ophthalmology', degree: 'M.S., DNB', image: 'dr_parveen_monga.jpg', symptomFocus: ['eye pain', 'cataract', 'vision problem'] },
  { _id: 'ncjims36', name: 'Dr. Sundeep Pannu', speciality: 'Ophthalmology', degree: 'MS', image: 'dr_pannu.jpg', opdDays: 'Monday to Saturday', symptomFocus: ['retina', 'eye consultation'] },
  { _id: 'ncjims37', name: 'Dr. Kumika Kansal', speciality: 'Ophthalmology', degree: 'M.S.', image: 'dr_kumika.jpg', symptomFocus: ['eye surgery', 'cornea', 'ophthalmology'] },
  { _id: 'ncjims38', name: 'Dr. Madhuri Mehta', speciality: 'ENT, Head and Neck Surgery', degree: 'MS', image: 'dr_madhuri.jpg', opdDays: 'Monday, Tuesday (Evening Session), Thursday, Saturday', symptomFocus: ['ear pain', 'sinus', 'throat pain', 'ent'] },
  { _id: 'ncjims39', name: 'Dr. Ritika Baheti', speciality: 'ENT, Head and Neck Surgery', degree: 'MS', image: 'dr_ritika.png', opdDays: 'Monday to Saturday', symptomFocus: ['ear issue', 'nose blockage', 'throat issue'] },
  { _id: 'ncjims40', name: 'Dr. Mohit Vashisth', speciality: 'ENT, Head and Neck Surgery', degree: 'MS', image: 'dr_mohit.jpg', opdDays: 'Monday to Saturday', symptomFocus: ['ent surgery', 'throat', 'hearing'] },
  { _id: 'ncjims41', name: 'Dr. Navroz Mehta', speciality: 'ENT, Head and Neck Surgery', degree: 'M.S., D.N.B.', image: 'dr_navroz.jpg', opdDays: 'Monday to Saturday', symptomFocus: ['ent review', 'head and neck surgery'] },
  { _id: 'ncjims42', name: 'Dr. Shilpa Khetarpal', speciality: 'Gynae & Obs.', degree: 'MS', image: 'dr_shilpa.jpg', opdDays: 'Monday, Wednesday, Friday', symptomFocus: ['pregnancy', 'period issues', 'women health', 'pcod'] },
  { _id: 'ncjims43', name: 'Dr. Shaveta Aggarwal', speciality: 'Gynae & Obs.', degree: 'DGO', image: 'dr_shveta.jpg', opdDays: 'Monday, Tuesday, Thursday, Saturday', symptomFocus: ['women health', 'pregnancy care'] },
  { _id: 'ncjims44', name: 'Dr. Anjali Sharma', speciality: 'Gynae & Obs.', degree: 'MS', image: 'dr_anjalisharma.jpg', opdDays: 'Monday to Saturday', symptomFocus: ['obstetrics', 'gynecology', 'pregnancy'] },
  { _id: 'ncjims45', name: 'Dr. Devinder Jasuja', speciality: 'Dermatology', degree: 'MD', image: 'dr_devender.jpg', opdDays: 'Monday to Saturday', symptomFocus: ['skin rash', 'acne', 'itching', 'hair fall'] },
  { _id: 'ncjims46', name: 'Dr. Shubham Mehta', speciality: 'Psychiatry', degree: 'MD', image: 'dr_shubham.jpg', opdDays: 'Monday to Saturday', symptomFocus: ['anxiety', 'depression', 'panic', 'stress'] },
  { _id: 'ncjims47', name: 'Dr. Shivani Bansal', speciality: 'Dental Surgery', degree: 'MDS', image: 'dr_shivani.jpg', opdDays: 'Monday to Saturday', symptomFocus: ['tooth pain', 'dental surgery', 'root canal'] },
  { _id: 'ncjims48', name: 'Dr. Asha Aggarwal', speciality: 'Dental Surgery', degree: 'BDS', image: 'dr_asha_aggarwal.jpg', opdDays: 'Monday to Saturday', symptomFocus: ['dental filling', 'tooth extraction'] },
  { _id: 'ncjims49', name: 'Dr. Neha Garg (Dental Surgery)', speciality: 'Dental Surgery', degree: 'BDS', image: 'dr_neha_garg.jpg', opdDays: 'Monday to Saturday', symptomFocus: ['dental consultation', 'oral care'] },
  { _id: 'ncjims50', name: 'Dr. Ritu Chopra', speciality: 'Anaesthesia, Critical Care & Pain', degree: 'MD', image: 'dr_ritu_chopra.jpg', secondarySpecialities: ['Critical Care'] },
  { _id: 'ncjims51', name: 'Dr. Varun Gupta', speciality: 'Anaesthesia, Critical Care & Pain', degree: 'DNB', image: 'dr_varun.jpg', secondarySpecialities: ['Critical Care'] },
  { _id: 'ncjims52', name: 'Dr. Monica Goyal', speciality: 'Anaesthesia, Critical Care & Pain', degree: 'MD, DNB', image: 'dr_monica_goyal.jpg', secondarySpecialities: ['Critical Care'] },
  { _id: 'ncjims53', name: 'Dr. Varuna Singal', speciality: 'Anaesthesia, Critical Care & Pain', degree: 'MD', image: 'dr_varuna.png', note: 'The critical care section appears to list the same faculty image as Dr. Varuna Garg / Singal on the official page.', secondarySpecialities: ['Critical Care'] },
  { _id: 'ncjims54', name: 'Dr. Shinjini Lahari', speciality: 'Anaesthesia, Critical Care & Pain', degree: 'DNB', image: 'dr_shinjini.jpg', secondarySpecialities: ['Critical Care'] },
  { _id: 'ncjims55', name: 'Dr. Vinay Rohilla', speciality: 'Anaesthesia, Critical Care & Pain', degree: 'DA', image: 'dr_vinayR.jpg', secondarySpecialities: ['Critical Care'] },
  { _id: 'ncjims56', name: 'Dr. Soni Khurana', speciality: 'Critical Care', degree: 'DNB (Internal Medicine), IDCC', image: 'dr_soni_khurana.jpg' },
  { _id: 'ncjims57', name: 'Dr. Priyanka Chhabra', speciality: 'Radiodiagnosis & Interventional Neuro Radiology', degree: 'DMRD', image: 'dr_chhabra.jpg' },
  { _id: 'ncjims58', name: 'Dr. Teenu Singh', speciality: 'Radiodiagnosis & Interventional Neuro Radiology', degree: 'MD', image: 'dr_teenu.png' },
  { _id: 'ncjims59', name: 'Dr. Pankaj Kumar', speciality: 'Radiodiagnosis & Interventional Neuro Radiology', degree: 'DNB', image: 'dr_pankaj_radio.jpg' },
  { _id: 'ncjims60', name: 'Dr. Anu Sharma', speciality: 'Radiodiagnosis & Interventional Neuro Radiology', degree: 'MD', image: 'dr_anu.jpg' },
  { _id: 'ncjims61', name: 'Dr. Manjeet Singh', speciality: 'Radiodiagnosis & Interventional Neuro Radiology', degree: 'DMRD, DNB', image: 'dr_manjeet.jpg' },
  { _id: 'ncjims62', name: 'Dr. Chiranji Lal Goel', speciality: 'Radiodiagnosis & Interventional Neuro Radiology', degree: 'DNB', image: 'dr_chiranji.jpg' },
  { _id: 'ncjims63', name: 'Dr. Parveen Raheja', speciality: 'Radiodiagnosis & Interventional Neuro Radiology', degree: 'DNB', image: 'Dr_Parveen_Raheja.jpg' },
  { _id: 'ncjims64', name: 'Dr. Himanshu Pruthi', speciality: 'Radiodiagnosis & Interventional Neuro Radiology', degree: 'M.D., D.N.B', image: 'Himanshu_Pruthi.jpg' },
  { _id: 'ncjims65', name: 'Dr. Naveen Ganer', speciality: 'Physiotherapy', degree: 'MPT', image: 'temp.jpg' },
  { _id: 'ncjims66', name: 'Dr. Shalu Jangra', speciality: 'Physiotherapy', degree: 'MPT', image: 'temp.jpg' },
  { _id: 'ncjims67', name: 'Dr. Aman Raj', speciality: 'Physiotherapy', degree: 'MPT', image: 'temp.jpg' },
  { _id: 'ncjims68', name: 'Dr. Subham Mittal', speciality: 'Physiotherapy', degree: 'MPT', image: 'temp.jpg' },
  { _id: 'ncjims69', name: 'Dr. Radhey Shyam', speciality: 'Physiotherapy', degree: 'MPT', image: 'temp.jpg' },
  { _id: 'ncjims70', name: 'Dr. Gaurav Prashar', speciality: 'Paediatric Surgery', degree: 'M.Ch.', image: 'dr_prashar.jpg', opdDays: 'Monday to Saturday' },
  { _id: 'ncjims71', name: 'Dr. Alka Bishnoi', speciality: 'Endocrinology', degree: 'MD, DrNB (Endocrinology & Metabolism)', image: 'Dr_Alka.jpg', opdDays: 'Monday to Saturday', symptomFocus: ['diabetes', 'thyroid', 'pcod', 'hormone issue'] },
  { _id: 'ncjims72', name: 'Dr. M S Senthilnathan', speciality: 'Nuclear Medicine', degree: 'M.D.', image: 'dr_senthilnathan.jpg' }
]

export const ncjimsFallbackDoctors = rawDoctors.map(buildDoctor)

export const ncjimsSpecialities = [...new Set(ncjimsFallbackDoctors.map((doctor) => doctor.speciality))]

export const ncjimsDepartmentSummaries = Object.entries(
  ncjimsFallbackDoctors.reduce((acc, doctor) => {
    if (!acc[doctor.speciality]) {
      acc[doctor.speciality] = {
        speciality: doctor.speciality,
        doctors: 0,
        facilities: doctor.departmentFacilities
      }
    }
    acc[doctor.speciality].doctors += 1
    return acc
  }, {})
).map(([, value]) => value)
