import {useForm} from 'react-hook-form';
import '../App.css'


export default function Landing(){
    const {register,
        handleSubmit,
        watch,
        formState : {errors, isSubmitting},
    } = useForm();

    async function OnSubmit(data){
        await new Promise(r=>setTimeout(r, 3000));
        console.log("Here's your form's data : -> \n", data);
    }
    return (
        <div className = "content">
            <form onSubmit={handleSubmit(OnSubmit)} className='grid grid-cols-2 mb-40 mt-36'>

            <div className='col-span-1'>
                <div className='inputBox items-stretch' >
                    <label>⁕First Name:</label>
                    <input
                    className='bg-gray-100 rounded-2xl m-6'
                    {...register('firstName',
                        {required:true,
                            minLength:{value:2, message:"Minimum length atleast 2"}
                        }
                    )}
                    />
                    {errors.firstName && alert('Please enter your First Name')}
                </div>

                <div className="inputBox">
                    <label>⁕Last Name:</label>
                    <input
                    className='bg-gray-100 rounded-2xl m-6'
                    {...register('lastName',
                        {required:true,
                        minLength:{value:2, message:"Minimum length atleast 2"}
                        }
                    )}
                    />
                    {errors.lastName && alert('Please enter your last Name')}
                </div>

                <div className='inputBox' >
                    <label>⁕Date of Birth:</label>
                    <input type = "date" style = {{width:"180px", marginLeft : "18px", padding: " px 6px"}}
                    className='bg-gray-100 rounded-xl pl-6 m-6'
                    {...register('dob',
                        {required:true})}
                    />
                    {errors.dob && alert('Please enter your Date of Birth')}
                </div>
                <div className='inputBox' style = {{height:"72px", display:"flex", justifyContent:"space-around", alignItems:"center"}}>
                    <label for="options">Gender</label>
                    <select style = {{width :"180px", backgroundColor:"rgb(245, 243, 243)", marginLeft:"58px", borderRadius:"8px",}} id="options" name="options" {...register('Gender')}>
                    <option value="NonSelected">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer to Not Self Identify">Prefer to Not Self Identify</option>
                    </select>
                </div>
                <div className='inputBox' style = {{height:"72px", display:"flex", justifyContent:"space-around", alignItems:"center"}}>
                    <label>⁕Phone Number</label>
                    <input type = "tel" placeholder='9876543210'
                    className='bg-gray-100 rounded-2xl  '
                    {...register('phoneNumber',
                        {required:true,
                        minLength:{value:10,message:"Please put 10 digits"},
                        maxLength:{value:10,message:"Please put 10 digits"},
                        }
                    )}
                    />
                    {errors.phoneNumber && alert('Please enter your Phone Number')}
                </div>

            </div>
            <div className='col-span-1'>
                <div className='inputBox' style = {{height:"72px", display:"flex", justifyContent:"space-around", alignItems:"center"}}>
                    <label for="options">Blood Type : </label>
                    <select style = {{width :"180px", backgroundColor:"rgb(236, 236, 236)", marginLeft:"10px", borderRadius:"8px",}} id="options" name="options" {...register('BloodGroup')}>
                    <option value="NonSelected">Select</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="Unknown">Unknown</option>
                    </select>
                </div>

                <div className='inputBox' style = {{height:"72px", display:"flex", justifyContent:"space-around", alignItems:"center"}}>
                    <label>⁕Mother Tongue:</label>
                    <input
                    className='bg-gray-100 rounded-2xl m-6 w-50' placeholder='English/Hindi/Kannada/Malayalam/Telugu/Pubjabi'
                    {...register('mothertongue',
                        {required:true,
                        minLength:{value:2, message:"Minimum length atleast 2"}
                        }
                    )}
                    />
                    {errors.mothertongue && alert('Please enter your Mother Tongue')}
                </div>

                <div className='inputBox' style = {{height:"72px", display:"flex", justifyContent:"space-around", alignItems:"center"}}>
                    <label>⁕NATIONAL ID : </label>
                    <input type = "number" style = {{width:"180px", marginLeft : "18px", padding: " 0px 6px"}}
                    className='bg-gray-100 rounded-xl m-8' placeholder='4567 6789 3456'
                    {...register('card',
                        {required:true,
                         minLength:{value:12, message:"Please enter 12 digit National ID Number"},
                         maxLength:{value:12, message:"Please enter 12 digit National ID Number"},
                         },                        
                        )}
                    />
                    {errors.card && alert('Please enter your National ID')}
                </div>
                <div className='inputBox' style = {{height:"72px", display:"flex", justifyContent:"space-around", alignItems:"center"}}>
                    <label>⁕Email id : </label>
                    <input type = "email"
                    className='bg-gray-100 rounded-2xl mr-1'
                    {...register('email',
                        {required:true,}
                    )}
                    />
                    {errors.email && alert('Please enter your Email ID')}
                </div>
                <div className='inputBox' style = {{height:"72px", display:"flex", justifyContent:"space-around", alignItems:"center"}}>
                    <label>⁕Emergengy Contact Number</label>
                    <input type = "tel" placeholder='9876543210'
                    className='bg-gray-100 rounded-2xl mr-10'
                    {...register('emerphoneNumber',
                        {required:true,
                        minLength:{value:10,message:"Please put 10 digits"},
                        maxLength:{value:10,message:"Please put 10 digits"},
                        }
                    )}
                    />
                    {errors.emerphoneNumber && alert('Please enter your Emergency Contact Number')}
                </div>

            </div >
            <div className='col-span-2'>
                <div className='inputBox' style = {{height:"72px", display:"flex", justifyContent:"space-around", alignItems:"center"}}>
                    <label>Please mention Allergies {`(If any)`}</label>
                    <input type = "textarea" placeholder='Asthama/Skin Rashes/Something Specific . . .'
                    className='bg-gray-100 rounded-2xl w-200 h-12 '
                    {...register('allergies')}
                    />
                </div>
                <div className='inputBox' style = {{height:"72px", display:"flex", justifyContent:"space-around", alignItems:"center"}}>
                    <label>Please Mention Medical History</label>
                    <input type = "textarea" placeholder=' Past Surgeries, Under Medication for some disease/disorder . . .'
                    className='bg-gray-100 rounded-2xl w-200 h-10'
                    />
                </div>
                <div className='inputBox' style = {{height:"72px", display:"flex", justifyContent:"space-around", alignItems:"center"}}>
                    <label>Address</label>
                    <input type = "textarea" placeholder='10th downing Streets, London . . .'
                    className='bg-gray-100 rounded-2xl w-200 h-10 ml-40'
                    />
                </div>
                <input type = "submit" className='button bg-purple-600 hover:bg-purple-800 max-w-6xl min-w-6xl border-black-600 border-1 h-10 rounded-2xl text-gray-300 cursor-pointer' disabled={isSubmitting} value = {isSubmitting?" is Submitting . . ." : "Submit"}></input>
            </div>
            </form>

        </div>
    )
}