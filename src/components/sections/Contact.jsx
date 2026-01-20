import React from 'react';
import { useNavigate } from 'react-router-dom';
import { sendContactNotification } from '../../api/getPortfolioData';
import { Loader2 } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = React.useState({
        identification: '',
        frequency: '',
        transmission: ''
    });
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
        const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

        if (formData.identification === adminEmail && formData.frequency === adminPassword) {
            navigate('/admin/blog');
        } else {
            console.log('Normal submission:', formData);

            const apiPayload = {
                name: formData.identification,
                email: formData.frequency,
                message: formData.transmission
            };

            setLoading(true);

            sendContactNotification(apiPayload)
                .then(response => {
                    console.log('Message sent successfully:', response);
                    alert('Message sent successfully!');
                    setFormData({
                        identification: '',
                        frequency: '',
                        transmission: ''
                    });
                })
                .catch(error => {
                    console.error('Error sending message:', error);
                    alert('Failed to send message. Please try again.');
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    return (
        <section className="pb-20 px-4">
            <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-black text-white mb-8">READY TO <span className="text-emerald-500">COLLABORATE</span></h2>

                <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-4 md:p-8 shadow-2xl shadow-emerald-900/20">
                    <form onSubmit={handleSubmit} className="space-y-4 text-left">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Identification</label>
                            <input
                                type="text"
                                name="identification"
                                value={formData.identification}
                                onChange={handleChange}
                                placeholder="YOUR NAME"
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Contact Address</label>
                            <input
                                type="text"
                                name="frequency"
                                value={formData.frequency}
                                onChange={handleChange}
                                placeholder="YOUR EMAIL"
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Message</label>
                            <textarea
                                rows={4}
                                name="transmission"
                                value={formData.transmission}
                                onChange={handleChange}
                                placeholder="MESSAGE CONTENT..."
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] ${loading ? 'opacity-75 cursor-not-allowed hover:scale-100' : ''}`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    TRANSMITTING...
                                </span>
                            ) : (
                                'CREATE CONTACT'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
