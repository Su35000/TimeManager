import {useState, useEffect} from "react"
import { useUserState} from "../../context/userContext";
import AccountForm from "../../components/forms/AccountForm";

export default function Profile(){
    const [displayForm, setDisplayForm] = useState(false)
    const [displayHiddenField, setDisplayHiddenField] = useState(false);

    const {user} = useUserState()
    const profileInputs =  [
        {
            label:"email",
            type:"email",
            value:user.email,
            isDisabled:!displayForm,
            isHidden: false
        },
        {
            label:"username",
            type:"text",
            value:user.username,
            isDisabled:!displayForm,
            isHidden: false
        },
        {
            label:"currentPassword",
            type:"password",
            value:"",
            isDisabled:!displayForm,
            isHidden: !displayHiddenField
        },
    ]

    const handleOnPress = (e:any) => {
        e.preventDefault();
        setDisplayForm(!displayForm)
        setDisplayHiddenField(true);
    }

    const onSubmit = (e:any) => {
        e.preventDefault();
        setDisplayForm(!displayForm)
    }

    useEffect(()=>{

    },[])
    
    return(
        <AccountForm
            inputs={profileInputs}
            title="Profile"
            buttonLabel={displayForm ? "Submit" : "Update my profile"}
            onSubmit={displayForm ? onSubmit : handleOnPress}
        />
    )
}