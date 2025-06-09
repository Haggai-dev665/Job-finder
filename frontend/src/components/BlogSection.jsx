import React from 'react';
import { BookOpen, ArrowRight, Clock, User, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import useScrollAnimation from '../hooks/useScrollAnimation';

const BlogSection = () => {
  const [headerRef, headerVisible] = useScrollAnimation(0.1);
  const [postsRef, postsVisible] = useScrollAnimation(0.1);

  const blogPosts = [
    {
      type: 'Blog Post',
      title: 'Why Naval Ravikant Thinks Remote Work Is The Future',
      excerpt: 'It feels like the rise of remote work has been a top conversation in tech for years, but despite the enthusiasm and attention...',
      author: 'Sarah Chen',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop&auto=format',
      category: 'Future of Work',
      featured: true
    },
    {
      type: 'Job Collection',
      title: '18 Innovative Space Startups Hiring Now',
      excerpt: 'Few tech sectors are capturing the public\'s collective imagination as much as space. Privatized spaceflight, or "NewSpace," is attracting...',
      author: 'Marcus Rodriguez',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=250&fit=crop&auto=format',
      category: 'Space Tech'
    },
    {
      type: 'Job Collection',
      title: '19 Hot Crypto Startups Hiring Remotely in 2025',
      excerpt: 'Either Crypto has a great PR team, or the internet-based medium of exchange is truly taking the world by storm...',
      author: 'Emily Watson',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=250&fit=crop&auto=format',
      category: 'Cryptocurrency'
    },
    {
      type: 'Job Collection',
      title: '20 Women-Led Startups Expanding Their Remote Teams in 2025',
      excerpt: 'It is no surprise by now that women make great leaders. In the US alone, women-led businesses generated more than 1.8 trillion dollars...',
      author: 'Lisa Park',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=250&fit=crop&auto=format',
      category: 'Leadership'
    },
    {
      type: 'Blog Post',
      title: 'The Truth About Finding Your First Engineering Job',
      excerpt: 'Even for senior engineers, job searches can be confusing, frustrating affairs. When you\'re a junior engineer looking for your first job...',
      author: 'David Kim',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=250&fit=crop&auto=format',
      category: 'Career Advice'
    },
    {
      type: 'Blog Post',
      title: '30 Questions to Ask Before Joining a Startup',
      excerpt: 'You\'re trying to evaluate the company while still impressing your interviewers, and that balance can be tricky...',
      author: 'Alex Thompson',
      readTime: '12 min read',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&auto=format',
      category: 'Interview Tips'
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            headerVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 mr-3 text-black" />
            <span className="text-lg font-semibold text-black">
              From the Blog
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Latest insights & resources
          </h2>
          
          <p className="text-xl max-w-3xl mx-auto text-gray-700">
            Stay ahead with the latest trends, career advice, and startup insights from industry experts.
          </p>
        </div>

        {/* Featured Post */}
        <div 
          ref={postsRef}
          className={`mb-16 transition-all duration-1000 ${
            postsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="group relative rounded-3xl overflow-hidden bg-white border border-gray-200 hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Image Side */}
              <div className="relative overflow-hidden">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-64 lg:h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:bg-gradient-to-r" />
                
                {/* Featured Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black text-white text-xs font-bold rounded-full flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Featured
                  </span>
                </div>
              </div>

              {/* Content Side */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="mb-4">
                  <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    {blogPosts[0].type}
                  </span>
                </div>

                <h3 className="text-2xl lg:text-3xl font-bold text-black mb-4 group-hover:text-gray-800 transition-colors duration-300">
                  {blogPosts[0].title}
                </h3>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>

                {/* Author & Meta */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-300 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-black">{blogPosts[0].author}</p>
                      <p className="text-xs text-gray-500">{blogPosts[0].category}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {blogPosts[0].readTime}
                  </div>
                </div>

                <Link
                  to="/blog"
                  className="inline-flex items-center font-bold text-black hover:text-gray-600 transition-colors duration-300 group"
                >
                  Read More
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.slice(1).map((post, index) => (
            <article 
              key={index}
              className={`group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 ${
                postsVisible 
                  ? 'animate-fade-in-up' 
                  : ''
              }`}
              style={{
                animationDelay: postsVisible ? `${index * 0.1}s` : '0s'
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="text-xs font-semibold text-white bg-black/70 px-2 py-1 rounded-full">
                    {post.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-3">
                  <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-black mb-3 line-clamp-2 group-hover:text-gray-800 transition-colors duration-300">
                  {post.title}
                </h3>

                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center">
                    <User className="w-3 h-3 mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {post.readTime}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/blog"
            className="inline-flex items-center px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl bg-black text-white hover:bg-gray-800"
          >
            More Posts
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
