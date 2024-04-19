import { Space, Tag } from 'antd';

import style from './filter-panel.module.css';

const FilterPanel = ({ catalog, setTag, activeTag }) => {
    const handleTagChange = (value) => {
        setTag(value.target.textContent);
    };

    return (
        <>
            <div className={style.tening_type}>
                <span className={style.title}>Тип тренировки:</span>
                <div className={style.traning_tag}>
                    {catalog?.map((item) => (
                        <Tag
                            className={activeTag === item.name ? style.activeTag : style.defult_tag}
                            key={item.key}
                            onClick={handleTagChange}
                        >
                            {item.name}
                        </Tag>
                    ))}
                </div>
            </div>
        </>
    );
};

export default FilterPanel;
