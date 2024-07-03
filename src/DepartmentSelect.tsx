/**
 * DepartmentSelects displays selector of departments and results
 */
import { useState,useEffect } from 'react'

// API imports
import axios from 'axios';

import ArtworkResults from './ArtworkResults';

// MUI Imports
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SelectChangeEvent  } from '@mui/material';

// Navigation imports
import { useDispatch, useSelector } from "react-redux"

// Redux imports
import { RootState } from "./Redux/index"
import { updateDepartment } from './Redux/DepartmentReducer';

/**
 * Department object - this pairs down all information needed for a Department
 * for the MMA API get more information
 */
export interface Department {
    departmentId: string,
    displayName: string,
}

/**
 * 
 * @returns div component of selector and ArtworkResults
 */
function DepartmentSelector() {

    const [departments, setDepartments] = useState<Department[]>([]); //departments to show in selector
    //const [selectedDept, setSelectedDept] = useState(''); //used before Redux change

    // Redux setup to save state of department
    const dispatch = useDispatch()
    let selectedDepartment = useSelector((state: RootState) => state.department.departmentId)
    
    /**
     * Handles logic for when a department is selected
     * @param event SelectChangeEvent string from select option
     */
    const handleChange = (event: SelectChangeEvent<string>) => {
        dispatch(updateDepartment(event.target.value))
        //setSelectedDept(event.target.value) // used before Redux change
    }

    /**
     *  API calls to get all departments to use for selector
     * and then sets the departments state with the response
     */
    useEffect(() => {
        axios.get('https://collectionapi.metmuseum.org/public/collection/v1/departments')
        .then(response => {
            setDepartments(response.data.departments);
        })
        .catch(error => {
            console.error("Error fetching departments from API",error)
        })
    },[])

    /**
     * Returns the display of a department given the departmentId
     * @param selectedDept string departmentID
     * @returns string displayName of department
     */
    const getName = (selectedDept: string) => {
        let index = departments.filter(obj => obj.departmentId == selectedDept).shift()
        if (index) {
            return index.displayName
        } 
    }

    /**
     *  Displays selected Department name and the Artwork Results for the department
     * @returns div of ArtworkResults
     */
    const additionalproto = () => {
        // don't render if no department has been selected
        if (selectedDepartment) {
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
                    <MenuItem key={department.departmentId} value={department.departmentId}>{department.displayName}</MenuItem> 
                ))}                    
                </Select>
            </FormControl>
            </Box>            
            {additionalproto()}
        </div>
    )
}

export default DepartmentSelector;

// OLD SELECTOR - DEPRECATED
{/* <select onChange={handleDepartmentChange}>
    <option value="">Select a department</option>
    {departments.map((department) => (
        <option key={department.departmentId} value={department.departmentId} label={department.displayName}/>
    ))}
</select> */}
{/* <h1>Department: {getName(selectedDept)}</h1>  
<ArtworkResults departmentId={selectedDept}/> */}