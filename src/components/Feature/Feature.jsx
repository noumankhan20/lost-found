    import { Search, Users, ShieldCheck } from 'lucide-react';

    export default function FeaturesSection() {
    const features = [
        {
        icon: <Search className="h-10 w-10 text-blue-600" />,
        title: 'Report & Search',
        description:
            'Easily report lost or found items with photos and descriptions.',
        },
        {
        icon: <Users className="h-10 w-10 text-green-600" />,
        title: 'Community Match',
        description:
            'We use community support and smart algorithms to match lost and found items.',
        },
        {
        icon: <ShieldCheck className="h-10 w-10 text-purple-600" />,
        title: 'Safe Reunions',
        description:
            'We provide safe meeting point recommendations and verification tools.',
        },
    ];

    return (
        <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How lost $ Found Works
            </h2>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            We connect people who have lost items with those who have found them — fast and safely.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
                <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300 text-left"
                >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
    }
