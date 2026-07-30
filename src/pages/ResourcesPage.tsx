import React, { useState } from 'react';
import { YOUTUBE_CHANNELS } from '../data/aktuData';
import { FEATURED_TOPIC_VIDEOS, TopicVideoInfo, getYouTubeSearchUrl, openTopicVideo } from '../utils/videoUtils';
import { VideoPlayerModal } from '../components/VideoPlayerModal';
import { Video, ExternalLink, Search, PlayCircle, Sparkles, Youtube, CheckCircle2, Clock, Tag, Tv, BookOpen, Layers } from 'lucide-react';

interface ResourcesPageProps {
  initialTopic?: string;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ initialTopic = '' }) => {
  const [topicQuery, setTopicQuery] = useState(initialTopic);
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'DSA & Placements' | 'Full Stack & Web Dev' | 'AI & Data Science' | 'System Design & CS Core' | 'Behavioral & Career'>('All');
  const [activeTab, setActiveTab] = useState<'topics' | 'channels'>('topics');

  // Modal State for direct video player
  const [playingVideo, setPlayingVideo] = useState<TopicVideoInfo | null>(null);

  const filteredChannels = YOUTUBE_CHANNELS.filter(ch => 
    selectedCategory === 'All' || ch.category === selectedCategory
  );

  const filteredTopicVideos = FEATURED_TOPIC_VIDEOS.filter(vid => {
    const matchesCat = selectedCategory === 'All' || 
      (selectedCategory === 'DSA & Placements' && vid.subjectOrCategory.includes('DSA')) ||
      (selectedCategory === 'Full Stack & Web Dev' && vid.subjectOrCategory.includes('Web')) ||
      (selectedCategory === 'AI & Data Science' && (vid.subjectOrCategory.includes('AI') || vid.subjectOrCategory.includes('Data'))) ||
      (selectedCategory === 'System Design & CS Core' && (vid.subjectOrCategory.includes('System') || vid.subjectOrCategory.includes('OS') || vid.subjectOrCategory.includes('DBMS') || vid.subjectOrCategory.includes('CS Core'))) ||
      (selectedCategory === 'Behavioral & Career' && vid.subjectOrCategory.includes('Behavioral'));

    const matchesQuery = !topicQuery || 
      vid.title.toLowerCase().includes(topicQuery.toLowerCase()) ||
      vid.subjectOrCategory.toLowerCase().includes(topicQuery.toLowerCase()) ||
      vid.description.toLowerCase().includes(topicQuery.toLowerCase()) ||
      vid.tags.some(t => t.toLowerCase().includes(topicQuery.toLowerCase()));

    return matchesCat && matchesQuery;
  });

  const handleSearchLaunch = (e: React.FormEvent) => {
    e.preventDefault();
    if (topicQuery.trim()) {
      setPlayingVideo({
        id: 'search-custom',
        title: `Search Tutorials for: ${topicQuery}`,
        subjectOrCategory: selectedCategory !== 'All' ? selectedCategory : 'Tech Tutorial',
        educator: 'Top Tech Educator',
        duration: 'Tutorial',
        query: topicQuery,
        description: `Direct interactive video search results for ${topicQuery}.`,
        tags: [topicQuery, 'Tutorial']
      });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Hero Header */}
      <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/60 text-cyan-300 text-xs font-mono mb-3">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
              <span>Verified Tech Educator Playlists</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
              Top Educator Video Masterclasses
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Direct topic video lectures from Striver, Gate Smashers, CodeWithHarry, NeetCode, StatQuest & Love Babbar — learn concepts directly in-app!
            </p>
          </div>

          <div className="shrink-0 p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 hidden md:block">
            <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase">Topic Coverage</div>
            <div className="text-xl font-mono font-bold text-white mt-1">100% Free & Verified</div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">Direct HD In-App Embeds</div>
          </div>
        </div>
      </div>

      {/* Global Video Search Bar */}
      <form onSubmit={handleSearchLaunch} className="p-4 rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl shadow-xl flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-cyan-400" />
          <input
            type="text"
            value={topicQuery}
            onChange={e => setTopicQuery(e.target.value)}
            placeholder="Search any specific topic (e.g. 'Binary Search', 'React Hooks', 'System Design Redis')..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none font-mono"
          />
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-xs hover:brightness-110 transition-all font-mono shrink-0 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
        >
          <Youtube className="h-4 w-4 text-slate-950" />
          <span>Find Topic Videos</span>
        </button>
      </form>

      {/* Main Tabs and Category Selector */}
      <div className="space-y-4">
        
        {/* Toggle View: Topic Videos vs Educator Channels */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-2 rounded-2xl border border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('topics')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
                activeTab === 'topics'
                  ? 'bg-slate-800 text-cyan-400 border border-cyan-500/40 shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Tv className="h-4 w-4" />
              <span>Featured Topic Masterclasses ({filteredTopicVideos.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('channels')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
                activeTab === 'channels'
                  ? 'bg-slate-800 text-cyan-400 border border-cyan-500/40 shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Youtube className="h-4 w-4" />
              <span>Top Tech Educator Channels ({YOUTUBE_CHANNELS.length})</span>
            </button>
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {(['All', 'DSA & Placements', 'Full Stack & Web Dev', 'AI & Data Science', 'System Design & CS Core', 'Behavioral & Career'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as any)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold font-mono whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Content Rendering */}
      {activeTab === 'topics' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-cyan-400" />
              <span>Specific Topic Tutorials & Masterclasses</span>
            </h3>
            <span className="text-[11px] font-mono text-cyan-400">Click to Play Directly In-App ▶</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTopicVideos.map(vid => (
              <div
                key={vid.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-xl flex flex-col justify-between hover:border-cyan-500/50 transition-all shadow-xl group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-md border border-cyan-500/30 bg-cyan-950/60 text-[10px] font-mono text-cyan-300 font-bold">
                      {vid.subjectOrCategory}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="h-3 w-3 text-cyan-400" />
                      {vid.duration}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white font-mono group-hover:text-cyan-300 transition-colors leading-snug">
                    {vid.title}
                  </h3>

                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {vid.description}
                  </p>

                  <div className="flex items-center gap-1.5 flex-wrap mt-3">
                    {vid.tags.map(tag => (
                      <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-slate-400">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <Youtube className="h-3.5 w-3.5 text-rose-500" />
                    <span>Instructor: <strong className="text-slate-200">{vid.educator}</strong></span>
                  </div>

                  <button
                    onClick={() => setPlayingVideo(vid)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 text-white font-bold text-xs hover:brightness-110 transition-all shadow-md shadow-rose-600/20 font-mono cursor-pointer"
                  >
                    <PlayCircle className="h-3.5 w-3.5" />
                    <span>Watch Tutorial</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Channels Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredChannels.map(ch => (
            <div
              key={ch.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-xl flex flex-col justify-between hover:border-cyan-500/40 transition-all shadow-lg group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full border border-cyan-500/30 bg-cyan-950/60 text-[10px] font-mono text-cyan-300 font-bold">
                    {ch.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {ch.recommendedFor}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 rounded-xl border border-rose-500/30 bg-rose-950/30 text-rose-400">
                    <Youtube className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-mono group-hover:text-cyan-300 transition-colors">
                      {ch.channelName}
                    </h3>
                    <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="h-3 w-3" /> Verified Educator Channel
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {ch.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">
                  Recommended Tech Educator
                </span>

                <a
                  href={ch.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:brightness-110 transition-all shadow-md shadow-cyan-500/20"
                >
                  <span>Visit Channel</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Video Player Modal */}
      {playingVideo && (
        <VideoPlayerModal
          isOpen={!!playingVideo}
          onClose={() => setPlayingVideo(null)}
          videoTitle={playingVideo.title}
          youtubeId={playingVideo.youtubeId}
          videoQuery={playingVideo.query}
          educator={playingVideo.educator}
        />
      )}

    </div>
  );
};
