import { BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

export function FeaturedExperiments() {
  const experiments = [
    {
      title: 'Why Cookies Spread',
      description: 'Discover how butter temperature, sugar ratios, and leavening agents control cookie spread and texture.',
      category: 'Cookie Science',
      readTime: '5 min read',
      color: 'from-amber-500 to-orange-600',
      url: '/articles/why-cookies-spread'
    },
    {
      title: 'Brown Sugar vs White Sugar',
      description: 'Compare how different sugars affect cookie texture, spread, flavor, and moisture retention.',
      category: 'Cookie Science',
      readTime: '6 min read',
      color: 'from-orange-500 to-amber-700',
      url: '/articles/brown-sugar-vs-white-sugar'
    },
    {
      title: 'Why Ice Cream Gets Icy',
      description: 'Learn about ice crystal formation, fat content, and stabilizers that prevent icy texture.',
      category: 'Ice Cream Science',
      readTime: '6 min read',
      color: 'from-cyan-500 to-blue-600',
      url: '/articles/why-ice-cream-gets-icy'
    },
    {
      title: 'Why Coffee Tastes Bitter',
      description: 'Understand what causes bitter coffee and how to fix it through better brewing technique.',
      category: 'Coffee Science',
      readTime: '5 min read',
      color: 'from-stone-600 to-amber-800',
      url: '/articles/why-coffee-tastes-bitter'
    },
    {
      title: 'Coffee Extraction Science',
      description: 'Master extraction ratios, water temperature, and grind size for perfect coffee brewing.',
      category: 'Coffee Science',
      readTime: '7 min read',
      color: 'from-amber-700 to-stone-800',
      url: '/articles/coffee-extraction-science'
    },
    {
      title: 'Why Cakes Collapse',
      description: 'Understand the science behind cake structure and how to prevent sinking or collapsing.',
      category: 'Cake Science',
      readTime: '7 min read',
      color: 'from-pink-500 to-rose-600',
      url: '/articles/why-cakes-collapse'
    }
  ];

  return (
    <section id="experiments" className="py-24 px-6 bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-full mb-6 shadow-lg">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm">Learn the Science</span>
          </div>
          <h2 className="text-4xl mb-4 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Food Science Articles</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Dive deep into the chemistry and physics behind great food
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiments.map((experiment) => (
            <Link
              key={experiment.title}
              to={experiment.url}
              className="bg-white border-2 border-transparent rounded-2xl p-8 hover:shadow-2xl hover:border-current transition-all group cursor-pointer hover:scale-105 block"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <span className={`px-4 py-1.5 bg-gradient-to-r ${experiment.color} text-white rounded-full shadow-md`}>
                  {experiment.category}
                </span>
                <span>•</span>
                <span>{experiment.readTime}</span>
              </div>

              <h3 className={`text-2xl mb-3 bg-gradient-to-r ${experiment.color} bg-clip-text text-transparent`}>
                {experiment.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                {experiment.description}
              </p>

              <div className={`flex items-center gap-2 text-sm group-hover:gap-3 transition-all bg-gradient-to-r ${experiment.color} bg-clip-text text-transparent`}>
                <span>Read Article</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            More articles coming soon! Check back regularly for new food science content.
          </p>
        </div>
      </div>
    </section>
  );
}