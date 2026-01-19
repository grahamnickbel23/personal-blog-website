import { useState, useEffect } from 'react';

const CACHE_DURATION = 3600000; // 1 hour in milliseconds

export const useGitHubStats = (githubUrl) => {
    const [stats, setStats] = useState({
        repos: 0,
        commits: 0,
        lastPush: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            if (!githubUrl) {
                setLoading(false);
                return;
            }

            // Extract username from URL
            // Handles formats like https://github.com/username or just username if passed directly
            const username = githubUrl.includes('github.com/')
                ? githubUrl.split('github.com/')[1].replace(/\/$/, '')
                : githubUrl;

            if (!username) {
                setLoading(false);
                return;
            }

            const cacheKey = `github_stats_v3_${username}`;
            const cachedData = localStorage.getItem(cacheKey);

            if (cachedData) {
                const { data, timestamp } = JSON.parse(cachedData);
                if (Date.now() - timestamp < CACHE_DURATION) {
                    setStats(data);
                    setLoading(false);
                    return;
                }
            }

            try {
                // Fetch user profile for repo count
                const profileRes = await fetch(`https://api.github.com/users/${username}`);
                if (!profileRes.ok) throw new Error('Failed to fetch profile');
                const profileData = await profileRes.json();

                // Fetch public events for commits and last push
                const eventsRes = await fetch(`https://api.github.com/users/${username}/events/public`);
                if (!eventsRes.ok) throw new Error('Failed to fetch events');
                const eventsData = await eventsRes.json();

                // Calculate commits (approximate from recent events)
                // Note: This only counts commits in the recent public events stream
                let commitCount = 0;
                let lastPushDate = null;

                eventsData.forEach(event => {
                    if (event.type === 'PushEvent') {
                        if (!lastPushDate) {
                            lastPushDate = new Date(event.created_at);
                        }
                        commitCount += event.payload.size;
                    } else if (event.type === 'CreateEvent' && !lastPushDate) {
                        // Fallback: If no PushEvent yet, use CreateEvent (branch/tag creation) as "Last Push" timestamp
                        // But we don't add to commitCount as it's not a commit
                        lastPushDate = new Date(event.created_at);
                    }
                });

                // Format Last Push time
                let lastPushText = 'RECENTLY';
                if (lastPushDate) {
                    const now = new Date();
                    const diffTime = Math.abs(now - lastPushDate);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                    if (diffDays <= 1) {
                        lastPushText = 'TODAY';
                    } else if (diffDays === 2) {
                        lastPushText = 'YESTERDAY';
                    } else {
                        lastPushText = `${diffDays} DAYS AGO`;
                    }
                }

                // Format commits for display (e.g. 1.2k if large, though specific events usually won't reach k's easily without pagination)
                // Keeping it simple number for now as per "1.2k" requirement logic but usually it's smaller for recent events window.
                // If the user wants "1.2k" effectively, they might need total lifetime commits which requires auth/scraping. 
                // We will display what we find. 

                const formattedStats = {
                    repos: profileData.public_repos,
                    commits: commitCount, // Display raw count from recent events
                    lastPush: lastPushText
                };

                // Cache the data
                localStorage.setItem(cacheKey, JSON.stringify({
                    data: formattedStats,
                    timestamp: Date.now()
                }));

                setStats(formattedStats);
                setError(false);
            } catch (err) {
                console.error("Error fetching GitHub stats:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [githubUrl]);

    return { stats, loading, error };
};
