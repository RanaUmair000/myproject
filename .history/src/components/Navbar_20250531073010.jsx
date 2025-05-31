import Loading from './Loading';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState, useEffect } from 'react';

const News = (props) => {
    const capitalize = (text) => {
        if (!text) return '';
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const updateData = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
        setLoading(true);
        const data = await fetch(url);
        props.setProgress(30);
        const parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setLoading(false);
        setTotalResults(parsedData.totalResults);
        props.setProgress(100);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        updateData();
    }, []);

    const fetchData = async () => {
        const nextPage = page + 1;
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
        const data = await fetch(url);
        const parsedData = await data.json();

        setArticles((prevArticles) => {
            const newArticles = prevArticles.concat(parsedData.articles);
            if (newArticles.length >= parsedData.totalResults) {
                setHasMore(false);
            }
            return newArticles;
        });

        setPage(nextPage);
        setTotalResults(parsedData.totalResults);
    };

    return (
        <div className='container mt-4'>
            <h1 className='text-center my-3'>
                NewsMonkey - Top {capitalize(props.category)} Headlines
            </h1>

            {loading && <Loading />}

            {!loading && (
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchData}
                    hasMore={hasMore}
                    loader={<Loading />}
                >
                    <div className='container'>
                        <div className='row my-3'>
                            {articles.map((element) => (
                                <div className='col-md-4 mt-3' key={element.url}>
                                    <NewsItem
                                        title={element.title ? element.title.slice(0, 40) : ''}
                                        description={
                                            element.description
                                                ? element.description.length > 88
                                                    ? element.description.slice(0, 88) + '...'
                                                    : element.description
                                                : ''
                                        }
                                        imageUrl={element.urlToImage}
                                        newsUrl={element.url}
                                        date={element.publishedAt}
                                        author={element.author}
                                        source={element.source.name}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </InfiniteScroll>
            )}
        </div>
    );
};

News.defaultProps = {
    country: 'us',
    pageSize: 2,
    category: 'health'
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string.isRequired,
    setProgress: PropTypes.func.isRequired
};

export default News;
