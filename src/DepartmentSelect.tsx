import { useState,useEffect } from 'react'
import axios from 'axios';
import ArtworkResults from './ArtworkResults';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SelectChangeEvent  } from '@mui/material';

import { useDispatch, useSelector } from "react-redux"
import { RootState } from "./Redux/index"
import { updateDepartment } from './Redux/DepartmentReducer';

import Backdrop from '@mui/material/Backdrop';

export interface Department {
    departmentId: string,
    displayName: string,
}


function DepartmentSelector() {

    const [departments, setDepartments] = useState<Department[]>([]);
    const [selectedDept, setSelectedDept] = useState('');

    const dispatch = useDispatch()
    let selectedDepartment = useSelector((state: RootState) => state.department.departmentId)
    
    // backdrop scenario
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const handleCloseBackdrop = () => {
        setOpenBackdrop(false);
    };
    const handleOpenBackdrop = () => {
        setOpenBackdrop(true);
    };

    const handleChange = (event: SelectChangeEvent<string>) => {
        // console.log(selectedDepartment)
        dispatch(updateDepartment(event.target.value))
        // console.log(selectedDepartment)
        //setSelectedDept(event.target.value)
    }

    useEffect(() => {
        axios.get('https://collectionapi.metmuseum.org/public/collection/v1/departments')
        .then(response => {
            setDepartments(response.data.departments);
            //console.log(`response: ${response.data.departments}`)
        })
        .catch(error => {
            console.error("Error fetching departments from API",error)
        })
    },[])


    const getName = (selectedDept: string) => {
        
        let index = departments.filter(obj => obj.departmentId == selectedDept).shift()
        if (index) {
            return index.displayName
        } 
    }

    // const additional = () => {
    //     if (selectedDept) {
    //         return (
    //             <div className="title">
    //                 <h1>{getName(selectedDept)}</h1>  
    //                 <ArtworkResults departmentId={selectedDept}/>
    //             </div>
    //         )     
    //     }
    // }
    const additionalproto = () => {
        if (selectedDepartment) {
            console.log()
            return (
                <div className="title">
                    <h1>{getName(selectedDepartment)}</h1>  
                    <ArtworkResults departmentId={selectedDepartment}/>
                </div>
            )     
        }
    }    

    return (
        <div>
            <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Department</InputLabel>
                <Select
                    //value={selectedDept}
                    value={selectedDepartment}
                    label="Department"
                    onChange={handleChange}
                >
                {departments.map((department) => (
                    //<MenuItem key={department.departmentId} value={department.departmentId}>{department.displayName}</MenuItem> 
                    <MenuItem key={department.departmentId} value={department.departmentId}>{department.displayName}</MenuItem> 
                ))}                    
                </Select>
            </FormControl>
            </Box>            
            {/* <select onChange={handleDepartmentChange}>
                <option value="">Select a department</option>
                {departments.map((department) => (
                    <option key={department.departmentId} value={department.departmentId} label={department.displayName}/>
                ))}
            </select> */}
            {/* <h1>Department: {getName(selectedDept)}</h1>  
            <ArtworkResults departmentId={selectedDept}/> */}
            {additionalproto()}
        </div>
    )
}

export default DepartmentSelector;