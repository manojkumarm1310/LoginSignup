export default function ProfilePageValidation(values)
{
 const error={};
 if(values.age=="")
 {
    error.age="Age should be entered!";
 }
 else if(values.age>1 && values.age<120)
 {
    error.age="";
 }
 else
 {
    error.age="Invalid age";
 }
 if(values.gender=="")
 {
    error.gender="Gender should be entered";
 }
 else if(values.gender.toLowerCase()=="male" || values.gender.toLowerCase()=="female" || values.gender=="transgender")
 {
    error.gender="";
 }
 else
 {
    error.gender="Enter Male or female or transgender";
 }
 if(values.MobileNumber=="")
 {
    error.MobileNumber="Enter your Contact Number";
 }
 else
 {
    error.MobileNumber="";
 }
 if(values.DOB=="")
 {
    error.DOB="Enter your Date of Birth";
 }
 else
 {
    error.DOB="";
 }
  return error;

}