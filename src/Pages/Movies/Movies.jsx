import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa6';
import { GiProgression } from 'react-icons/gi';
import { GoSearch } from 'react-icons/go';
import { IoClose } from 'react-icons/io5';
import { MdDateRange } from 'react-icons/md';

const Movies = () => {
    const [allMovies, setAllMovies] = useState([]);
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState('All');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    const genres = [
        'All',
        'Drama',
        'Comedy',
        'Action',
        'Romance',
        'Crime',
        'Thriller',
    ];

    const fetchMovies = () => {
        setLoading(true);

        fetch('https://api.tvmaze.com/shows')
            .then((res) => res.json())
            .then((data) => {
                setAllMovies(data);
                setMovies(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    // Initial data
    useEffect(() => {
        fetchMovies();
    }, []);

    // Body scroll lock
    useEffect(() => {

        if (selectedMovie) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };

    }, [selectedMovie]);

    const handleSearch = (e) => {
        const value = e.target.value;

        setSearch(value);
        setActiveTab('All');

        if (!value.trim()) {
            setMovies(allMovies);
            return;
        }

        setLoading(true);

        fetch(
            `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(
                value
            )}`
        )
            .then((res) => res.json())
            .then((data) => {
                const results = data.map((item) => item.show);

                setMovies(results);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    // Genre filter
    const handleGenreFilter = (genre) => {

        setActiveTab(genre);
        setSearch('');

        if (genre === 'All') {
            setMovies(allMovies);
            return;
        }

        const filteredMovies = allMovies.filter((movie) =>
            movie.genres?.some((movieGenre) => movieGenre.toLowerCase() === genre.toLowerCase())
        );

        setMovies(filteredMovies);
    };

    return (
        <>
            <div className="py-17.5">
                <div className="container">

                    {/* Page Header */}
                    <div>
                        <h1 className='text-3xl sm:text-4xl md:text-[50px] font-bold text-white'>
                            Explore{' '}
                            <span className='text-[#f97360]'>Movies</span>
                        </h1>

                        <p className='mt-4 text-[#ffffffb3] text-sm sm:text-base'> Discover amazing shows and find your next favorite story.</p>
                    </div>

                    <div className='flex justify-between flex-col lg:flex-row items-center mt-8 gap-5'>
                        {/* Search */}
                        <div className='order-1 lg:order-2 shrink-0 w-full max-w-97.5'>
                            <div className='relative w-full'>
                                <span className='absolute left-4 top-1/2 -translate-y-1/2 text-[#f4c95d] text-xl'>
                                    <GoSearch />
                                </span>
                                <input type='text' value={search} onChange={handleSearch} placeholder='Search for a movie...' className='w-full bg-[#151E27] border border-[#ffffff26] rounded-lg py-2.5 pl-12 pr-5 text-white outline-none focus:border-[#f97360]' />
                            </div>
                        </div>

                        {/* Genre Tabs */}
                        <div className='flex flex-wrap justify-center gap-2 order-2 lg:order-1'>
                            {genres.map((genre) => (
                                <button key={genre} onClick={() => handleGenreFilter(genre) } className={`py-2 px-3.75 sm:px-5 rounded-sm border text-sm font-medium cursor-pointer transition ${ activeTab === genre ? 'bg-[#f4c95d] border-[#f4c95d] text-[#101820]' : 'bg-transparent border-[#ffffff26] text-white hover:border-[#f97360] hover:text-[#f97360]' }`}>{genre}</button>
                            ))}
                        </div>
                    </div>

                    {/* Movies */}
                    <div className='mt-12'>
                        {loading ? (
                            <div className='flex justify-center items-center py-20'>
                                <div className='w-10 h-10 border-4 border-[#ffffff26] border-t-[#f97360] rounded-full animate-spin'></div>
                            </div>
                        ) : movies.length === 0 ? (
                            <div className='text-center py-20'>
                                <p className='text-white text-lg'>No movies found.</p>
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                                {movies.map((movie) => (
                                    <div key={movie.id} className='group bg-[#151E27] border border-[#ffffff1a] rounded-lg overflow-hidden hover:border-[#f97360] transition-all duration-300'>

                                        {/* Poster */}
                                        <div className='h-65 overflow-hidden bg-[#101820]'>
                                            {movie.image?.medium ? (
                                                <img src={movie.image.medium} alt={movie.name} className='w-full h-full object-cover group-hover:scale-103 transition-transform duration-500' />
                                            ) : (
                                                <div className='w-full h-full flex items-center justify-center text-[#ffffff66]'>
                                                    No Image
                                                </div>
                                            )}
                                        </div>

                                        {/* Card Content */}
                                        <div className='p-4'>
                                            <h2 className='text-white text-[22px] font-semibold truncate'>
                                                {movie.name}
                                            </h2>

                                            <div className='flex items-center justify-between mt-3'>
                                                <span className='flex items-center gap-1 text-[#f4c95d] text-[18px]'>
                                                    <FaStar />{' '}
                                                    {movie.rating?.average || 'N/A'}
                                                </span>

                                                <span className='text-gray-400 text-[18px] flex items-center gap-1'>
                                                    <MdDateRange />
                                                    {movie.premiered
                                                        ? movie.premiered.slice( 0, 4  ) : 'N/A'}
                                                </span>
                                            </div>

                                            <button onClick={() => setSelectedMovie(movie) } className='w-full mt-4 py-2 border border-[#f97360] text-[#f97360] hover:bg-[#f97360] hover:text-[#101820] rounded-sm font-medium transition cursor-pointer'>See Details</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Details Modal */}
            {selectedMovie && (
                <div onClick={() => setSelectedMovie(null)} className='fixed inset-0 z-99 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4'>
                    <div onClick={(e) => e.stopPropagation()} className='relative w-full max-w-222 max-h-[90vh] overflow-y-auto bg-[#151E27] border border-[#ffffff26] rounded-lg'>
                        {/* Close Button */}
                        <button onClick={() => setSelectedMovie(null)} className='absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center bg-[#f4c95d] text-[#101820] rounded-full cursor-pointer transition text-xl'>
                            <IoClose />
                        </button>

                        {/* Backdrop */}
                        <div>
                            {selectedMovie.image?.original ? (
                                <img src={selectedMovie.image.original} alt={selectedMovie.name} className='w-full max-h-87.5 h-full object-cover' />
                            ) : (
                                <div className='w-full h-full flex items-center justify-center text-[#ffffff66]'>No Image</div>
                            )}
                        </div>

                        {/* Modal Content */}
                        <div className="p-5 sm:p-7">

                            <h2 className='text-[22px] sm:text-3xl md:text-4xl font-bold text-white'>
                                {selectedMovie.name}
                            </h2>

                            {/* Basic Info */}
                            <div className='flex flex-wrap items-center gap-5 mt-2 md:mt-4 text-sm'>
                                <span className='flex items-center gap-1 text-[#f4c95d] text-[16px]'>
                                    <FaStar />{' '}
                                    {selectedMovie.rating?.average ||
                                        'N/A'}
                                </span>

                                <span className='text-[#ffffffb3] text-[16px] flex items-center gap-1'>
                                    <MdDateRange />{' '}
                                    {selectedMovie.premiered || 'N/A'}
                                </span>

                                <span className='text-[#ffffffb3] text-[16px] flex items-center gap-1'>
                                    <GiProgression />{' '}
                                    {selectedMovie.status || 'N/A'}
                                </span>
                            </div>

                            {/* Genres */}
                            {selectedMovie.genres?.length > 0 && (
                                <div className='flex flex-wrap gap-2 mt-3.75'>
                                    {selectedMovie.genres.map(
                                        (genre) => (
                                            <span key={genre} className='px-3 py-1 text-xs text-[#f97360] bg-[#f973601a] border border-[#f9736040] rounded-full' >
                                                {genre}
                                            </span>
                                        )
                                    )}
                                </div>
                            )}

                            {/* Overview */}
                            <div className='mt-5'>
                                <h3 className='text-lg font-semibold text-white mb-1'>Overview</h3>
                                <div className='text-[#ffffffb3] text-sm sm:text-base' dangerouslySetInnerHTML={{  __html: selectedMovie.summary || 'No summary available.', }} />
                            </div>

                            {/* Extra Information */}
                            <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.75 mt-5'>
                                <div>
                                    <p className='text-[#ffffff66] text-sm'>Language</p>
                                    <p className='text-white mt-1'>
                                        {selectedMovie.language || 'N/A'}
                                    </p>
                                </div>

                                <div>
                                    <p className='text-[#ffffff66] text-sm'>Runtime</p>
                                    <p className='text-white mt-1'>
                                        {selectedMovie.runtime ? `${selectedMovie.runtime} minutes` : 'N/A'}
                                    </p>
                                </div>

                                <div>
                                    <p className='text-[#ffffff66] text-sm'> Type</p>
                                    <p className='text-white mt-1'>
                                        {selectedMovie.type || 'N/A'}
                                    </p>
                                </div>

                                <div>
                                    <p className='text-[#ffffff66] text-sm'>Network</p>
                                    <p className='text-white mt-1'>
                                        {selectedMovie.network?.name || 'N/A'}
                                    </p>
                                </div>
                            </div>

                            {/* Close */}
                            <div className='text-end'>
                                <button onClick={() => setSelectedMovie(null)} className='mt-7.5 py-2 px-7 bg-[#f4c95d] text-[#101820] font-semibold rounded-sm cursor-pointer' >Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Movies;