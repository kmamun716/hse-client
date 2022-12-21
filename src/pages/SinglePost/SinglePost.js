import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../components/shared/Loading';

const SinglePost = () => {
    const user = useSelector(state=>state.user);
    const {slug} = useParams();
    const postTitle = slug.split('-').join(' ');
    const {data, isLoading} = useQuery(['post'], ()=>fetch(`http://localhost:4000/api/v1/post/${postTitle}`).then(res=>res.json()));
    if(isLoading){
        return <Loading/>
    }
    if(data?.message){
        toast.error(data?.message)
    }
    console.log(user)
    return (
        <div className='flex flex-col items-center'>
            {
                data?.message ? <h2 className=' text-red-500 text-2xl'>{data?.message}</h2>: <div>
                    <h3 className='text-3xl text-green-500'>{data?.title}</h3>
                    <img width='200em' src={data?.photo} alt={data?.title} />
                    <p><span>Author: {data?.user.name}</span></p>
                    <p>Writen On: {new Date(data?.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric"})}</p>
                    <p>Last Update On: {new Date(data?.updatedAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric"})}</p>
                    <p>{data?.content}</p>
                </div>
            }
        </div>
    );
};

export default SinglePost;