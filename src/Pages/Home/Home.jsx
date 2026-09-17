import React, { useEffect, useState } from 'react';
import banner from '../../assets/movie.jpg'
import { FaAward, FaStar } from 'react-icons/fa6';
import { IoArrowForwardOutline } from 'react-icons/io5';
import { NavLink } from 'react-router';

const Home = () => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch('https://api.tvmaze.com/shows')
            .then(res => res.json())
            .then(data => {
                const trending = data
                    .sort((a, b) => (b.rating.average || 0) - (a.rating.average || 0))
                    .slice(0, 4);

                setMovies(trending);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <>
            <div className='py-14 sm:py-20 lg:py-24'>
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-center">
                        <div className="order-2 lg:order-1 lg:pl-5">
                            <p className='inline-flex items-center gap-1.5 py-1.5 px-4 bg-[#f9736033] text-[12px] sm:text-[14px] text-[#f97360] font-medium rounded-full'>
                                <FaAward />
                                <span>12,400+ titles indexed</span>
                            </p>
                            <h1 className='font-bold text-[#FFFFFF] leading-[1.05] py-5 sm:py-6 text-[40px] sm:text-[52px] md:text-[64px]'>Discover your next{' '}<span className='bg-linear-to-r from-[#f97360] to-[#f4c95d] bg-clip-text text-transparent'>favorite film.</span>
                            </h1>
                            <p className='max-w-115 text-[16px] lg:text-[18px] leading-7 text-[#fcfcfc]'>Explore and uncover cinematic world-class stories from every corner of the globe searchable, rated, and beautifully organized.</p>
                            <div className='flex flex-col sm:flex-row sm:items-center pt-7 gap-3'>
                                <NavLink to='/movies' className='w-full sm:w-auto'>
                                    <button className='flex items-center gap-1.5 py-2.5 px-8 text-[16px] font-semibold justify-center bg-linear-to-r from-[#f97360] to-[#f4c95d] text-[#101820] rounded-sm cursor-pointer border border-[#f97360] w-full'>
                                        <span>Explore Movies</span>
                                        <IoArrowForwardOutline />
                                    </button>
                                </NavLink>
                                <button className='py-2.5 px-8 text-[16px] font-semibold bg-[#101820] border border-[#f97360] rounded-sm text-[#fcfcfc] cursor-pointer'>Watch Trailer</button>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 relative">
                            <div className='relative ml-auto max-w-190 overflow-hidden rounded-2xl border border-[#f4c95d5b] bg-[#151E27] p-2 shadow-2xl shadow-[#00000066]'>
                                <img className='aspect-[4/3] w-full object-cover rounded-xl' src={banner} alt="A cinematic movie scene" />
                                <div className='absolute inset-2 rounded-xl bg-linear-to-t from-[#0b1117cc] via-transparent to-transparent'></div>
                                <div className='absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4'>
                                    <div>
                                        <p className='text-xs uppercase tracking-[0.2em] text-[#f4c95d]'>Curated tonight</p>
                                        <p className='mt-1 text-xl sm:text-2xl font-bold text-white'>Stories worth staying up for.</p>
                                    </div>
                                    <div className='hidden sm:block rounded-full border border-white/30 bg-[#0b1117aa] px-4 py-2 text-sm text-white backdrop-blur-sm'>
                                        4K picks
                                    </div>
                                </div>
                            </div>
                            <div className='absolute -bottom-5 left-5 sm:left-10 rounded-lg border border-[#f9736066] bg-[#101820] px-4 py-3 shadow-xl'>
                                <p className='text-xs text-[#ffffff99]'>Fresh discoveries</p>
                                <p className='mt-0.5 text-lg font-bold text-[#f97360]'>Every day</p>
                            </div>
                        </div>
                    </div>

                    {/* Trending Movies */}
                    <div className="pt-20">
                        <h2 className="text-[40px] font-bold text-white mb-7">
                            Trending Movies
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {movies.map(movie => (
                                <div key={movie.id} className="bg-[#151E27] border border-[#ffffff1a] rounded-lg overflow-hidden" >
                                    <img className="w-full h-80 object-cover" src={movie.image?.medium} alt={movie.name} />
                                    <div className="p-4">
                                        <h3 className="text-white text-[22px] font-semibold truncate">{movie.name}</h3>
                                        <div className="flex items-center justify-between mt-2 text-sm">
                                            <span className="text-[#f4c95d] flex items-center gap-1.5 text-[18px]">
                                                <FaStar />
                                                {movie.rating?.average || 'N/A'}
                                            </span>
                                            <span className="text-gray-400 text-[18px]">
                                                {movie.premiered?.slice(0, 4)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex justify-center mt-10'>
                        <div>
                            <NavLink to='/movies'>
                                <button className='flex items-center gap-1.5 py-2.5 px-10 text-[16px] font-semibold justify-center bg-linear-to-r from-[#f97360] to-[#f4c95d] text-[#101820] rounded-sm cursor-pointer border border-[#f97360]'>
                                    <span>Explore Movies</span>
                                    <IoArrowForwardOutline />
                                </button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;