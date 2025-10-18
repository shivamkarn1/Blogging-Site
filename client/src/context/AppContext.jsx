import { createContext, useContext, useEffect, useState } from "react"
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { toast } from "sonner";

const AppContext = createContext();

export const AppProvider = ({children})=>{

    const navigate = useNavigate()

    const [token,setToken] = useState(null)
    const [blogs,setBlogs] = useState([])
    const [input,setInput] = useState("")

    // Set base URL explicitly
    const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:8000';
    
    const fetchBlogs = async()=>{
        try {
            
            // Make request with full URL for debugging
            const response = await fetch(`${baseURL}/api/v1/blog/all`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const responseData = await response.json();
            
            if(responseData.success && responseData.data) {
                const blogsArray = Array.isArray(responseData.data) ? responseData.data : [];
                setBlogs(blogsArray);
                toast.success(`Loaded ${blogsArray.length} blogs`);
            } else {
                toast.error(responseData.message || 'No blogs found');
                setBlogs([]);
            }
        } catch (error) {
            toast.error('Failed to fetch blogs: ' + error.message);
            setBlogs([]);
        }
    }
    
    useEffect(()=>{
        fetchBlogs();
        
        const token = localStorage.getItem('token')
        if(token){
            setToken(token)
        }
    },[])

    // Configure axios after component mounts
    useEffect(() => {
        axios.defaults.baseURL = baseURL;
        if(token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, [token, baseURL]);

    const value = {
        axios,navigate,token,setToken,blogs,setBlogs,input,setInput,fetchBlogs
    }
    
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = ()=>{
    return useContext(AppContext)
}