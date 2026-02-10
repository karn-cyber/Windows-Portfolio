'use client'

import { useState, useRef, useEffect } from 'react'

export default function SpotifyPlayer() {
  const [playlist] = useState([
    {
      id: 1,
      title: 'Right Round',
      artist: 'Flo Rida feat. Kesha',
      duration: '3:24',
      url: '/sounds/Florida_Kesha_-_Right_Round_(mp3.pm).mp3',
      color: 'from-pink-500 to-purple-600'
    },
    {
      id: 2,
      title: 'Dekha Hi Nahi',
      artist: 'Osho Jain',
      duration: '3:48',
      url: '/sounds/Osho_Jain_-_Dekha_Hi_Nahi_(mp3.pm).mp3',
      color: 'from-cyan-500 to-blue-600'
    }
  ])

  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(70)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => handleNext()

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [currentTrack])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length)
    setIsPlaying(true)
    setTimeout(() => audioRef.current?.play(), 100)
  }

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length)
    setIsPlaying(true)
    setTimeout(() => audioRef.current?.play(), 100)
  }

  const handleTrackSelect = (index) => {
    setCurrentTrack(index)
    setIsPlaying(true)
    setTimeout(() => audioRef.current?.play(), 100)
  }

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const currentSong = playlist[currentTrack]

  return (
    <div className="h-full bg-[#121212] flex flex-col overflow-hidden">
      {/* Hidden audio element */}
      <audio ref={audioRef} src={currentSong?.url} />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Now Playing */}
        <div className={`w-2/5 bg-gradient-to-br ${currentSong?.color} p-8 flex flex-col items-center justify-center relative overflow-hidden`}>
          {/* Animated Background Circles */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div className={`absolute w-96 h-96 rounded-full bg-white blur-3xl ${isPlaying ? 'animate-pulse' : ''} -top-20 -left-20`}></div>
            <div className={`absolute w-64 h-64 rounded-full bg-white blur-3xl ${isPlaying ? 'animate-pulse' : ''} bottom-10 right-10`}></div>
          </div>

          {/* Album Art */}
          <div className="relative z-10 mb-6">
            <div className={`w-48 h-48 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-lg rounded-2xl shadow-2xl flex items-center justify-center border-4 border-white/20 ${isPlaying ? 'animate-spin-slow' : ''}`}>
              <div className="w-40 h-40 bg-gradient-to-br from-white/40 to-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-24 h-24 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                </svg>
              </div>
            </div>
            {/* Vinyl effect */}
            <div className="absolute inset-0 w-48 h-48 rounded-full border-8 border-white/10"></div>
          </div>

          {/* Song Info */}
          <div className="text-center z-10">
            <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">{currentSong?.title}</h2>
            <p className="text-lg text-white/90 drop-shadow-md">{currentSong?.artist}</p>
          </div>

          {/* Visualizer bars */}
          {isPlaying && (
            <div className="absolute bottom-8 left-0 right-0 flex justify-center items-end space-x-1 z-10">
              {[...Array(40)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-white/60 rounded-full animate-pulse"
                  style={{
                    height: `${Math.random() * 40 + 10}px`,
                    animationDelay: `${i * 0.05}s`,
                    animationDuration: '0.8s'
                  }}
                ></div>
              ))}
            </div>
          )}
        </div>

        {/* Right Panel - Controls & Playlist */}
        <div className="flex-1 bg-[#121212] flex flex-col">
          {/* Controls Section */}
          <div className="p-6 border-b border-[#282828]">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="relative h-1.5 bg-[#4d4d4d] rounded-full overflow-visible group cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const percent = (e.clientX - rect.left) / rect.width
                  audioRef.current.currentTime = percent * duration
                }}>
                <div 
                  className="absolute h-full bg-[#1DB954] rounded-full transition-all"
                  style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                ></div>
                <div 
                  className="absolute h-3 w-3 bg-white rounded-full shadow-xl top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ left: `${(currentTime / duration) * 100 || 0}%`, marginLeft: '-6px' }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-[#a7a7a7] mt-2 font-medium">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Player Controls */}
            <div className="flex items-center justify-center space-x-6 mb-6">
              {/* Shuffle */}
              <button className="text-[#b3b3b3] hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.151.922a.75.75 0 10-1.06 1.06L13.109 3H11.16a3.75 3.75 0 00-2.873 1.34l-6.173 7.356A2.25 2.25 0 00.39 14.31l6.173-7.356a2.25 2.25 0 011.724-.804h1.947l-1.017 1.018a.75.75 0 001.06 1.06L13.151.922zM.922 3.08a.75.75 0 001.06 0L3.91 1.168 13.109 13H11.16a2.25 2.25 0 01-1.724-.804l-6.173-7.356a3.75 3.75 0 00-2.873-1.34h-.328L1.98 4.422a.75.75 0 01-1.06-1.06l-.078-.078z"/>
                </svg>
              </button>

              {/* Previous */}
              <button
                onClick={handlePrevious}
                className="text-[#b3b3b3] hover:text-white transition-colors hover:scale-105"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.3 1a.7.7 0 01.7.7v5.15l9.95-5.744a.7.7 0 011.05.606v12.575a.7.7 0 01-1.05.607L4 9.149V14.3a.7.7 0 01-.7.7H1.7a.7.7 0 01-.7-.7V1.7a.7.7 0 01.7-.7h1.6z"/>
                </svg>
              </button>

              {/* Play/Pause */}
              <button
                onClick={handlePlayPause}
                className="w-16 h-16 bg-white hover:scale-105 transition-transform rounded-full flex items-center justify-center shadow-2xl group"
              >
                {isPlaying ? (
                  <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z"/>
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"/>
                  </svg>
                )}
              </button>

              {/* Next */}
              <button
                onClick={handleNext}
                className="text-[#b3b3b3] hover:text-white transition-colors hover:scale-105"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M12.7 1a.7.7 0 00-.7.7v5.15L2.05 1.107A.7.7 0 001 1.712v12.575a.7.7 0 001.05.607L12 9.149V14.3a.7.7 0 00.7.7h1.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-1.6z"/>
                </svg>
              </button>

              {/* Repeat */}
              <button className="text-[#b3b3b3] hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 4.75A3.75 3.75 0 013.75 1h8.5A3.75 3.75 0 0116 4.75v5a3.75 3.75 0 01-3.75 3.75H9.81l1.018 1.018a.75.75 0 11-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 111.06 1.06L9.811 12h2.439a2.25 2.25 0 002.25-2.25v-5a2.25 2.25 0 00-2.25-2.25h-8.5a2.25 2.25 0 00-2.25 2.25v5A2.25 2.25 0 003.75 12H5v1.5H3.75A3.75 3.75 0 010 9.75v-5z"/>
                </svg>
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-[#b3b3b3]" fill="currentColor" viewBox="0 0 16 16">
                <path d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 010 4.88z"/>
                <path d="M11.5 13.614a5.752 5.752 0 000-11.228v1.55a4.252 4.252 0 010 8.127v1.55z"/>
              </svg>
              <div className="flex-1 h-1 bg-[#4d4d4d] rounded-full overflow-visible group cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const percent = (e.clientX - rect.left) / rect.width
                  setVolume(Math.round(percent * 100))
                }}>
                <div 
                  className="h-full bg-white rounded-full relative"
                  style={{ width: `${volume}%` }}
                >
                  <div className="absolute h-3 w-3 bg-white rounded-full shadow-lg top-1/2 -translate-y-1/2 right-0 -mr-1.5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
              <span className="text-xs text-[#b3b3b3] w-10 text-right">{volume}%</span>
            </div>
          </div>

          {/* Playlist Section */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-[#282828]">
              <h3 className="text-lg font-bold text-white">Queue</h3>
              <p className="text-sm text-[#a7a7a7]">{playlist.length} songs</p>
            </div>
            <div className="flex-1 overflow-y-auto px-2">
              {playlist.map((song, index) => (
                <div
                  key={song.id}
                  onClick={() => handleTrackSelect(index)}
                  className={`px-4 py-3 mx-2 rounded-lg cursor-pointer transition-all group ${
                    index === currentTrack 
                      ? 'bg-[#2a2a2a]' 
                      : 'hover:bg-[#1a1a1a]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className={`w-12 h-12 rounded bg-gradient-to-br ${song.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                        {index === currentTrack && isPlaying ? (
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z"/>
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"/>
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`font-semibold truncate ${
                          index === currentTrack ? 'text-[#1DB954]' : 'text-white'
                        }`}>
                          {song.title}
                        </div>
                        <div className="text-sm text-[#a7a7a7] truncate">{song.artist}</div>
                      </div>
                    </div>
                    <div className="text-sm text-[#a7a7a7] ml-4">{song.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  )
}
