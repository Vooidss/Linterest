import React, {useState, useCallback, useEffect} from 'react';
import { FaSkullCrossbones } from "react-icons/fa6";
import InputDescriptionForNewPin from "../elements/InputDescriptionForNewPin";
import axios from 'axios';
import { CgClose } from "react-icons/cg";


export default function CreatePage() {

    const [file, setFile] = useState<FileItem | null>(null);
    const [requestFile, setRequestFile] = useState<FileRequest>({ image: null, idsTag: []});
    const [tagsByInputWord, setTagsByInputWord] = useState<TagsByInputWord>({count:0, tags: []});
    const [chooseTags, setChooseTags] = useState<Tag[]>([]);
    const [isHover, setIsHover] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const selectedFile = event.target.files[0];
            const preview = URL.createObjectURL(selectedFile);
            const fileItem = { file: selectedFile, preview };
            setFile(fileItem);
            setRequestFile({
                image: selectedFile,
            });
            event.target.value = "";
        }
    };

    useEffect(() => {
        const tagIds = Array.isArray(chooseTags) ? chooseTags.map(tag => tag.id) : [];

        setRequestFile((prevData) => ({
            ...prevData,
            idsTag: tagIds
        }));
    }, [chooseTags]);


    useEffect(() => {
        console.log(requestFile.idsTag)
    }, [requestFile.idsTag]);

    const handleRemoveFile = () => {
        setFile(null);
        setRequestFile({
            image:null
        });
        setChooseTags([]);
    };

    const handleDeleteTag = (tag: Tag) => {
        setChooseTags((prevData) => prevData.filter(existingTag => existingTag.id !== tag.id));
    };

    const handleInputChange = (field: string, value: string) => {
        setRequestFile((prevData) => ({
            ...prevData,
            [field]: value
        }));
    };

    const handleChooseTags = (tag: Tag) => {
        setChooseTags((prevData) => {
            const isTagAlreadyAdded = prevData.some(existingTag => existingTag.id === tag.id);
            if (isTagAlreadyAdded) return prevData;

            return [...prevData, tag];
        });
    };


    const handleGetTagsByInputWord = async (word: string) => {
        if(word !== ""){
            try {
                const response = await axios.get(`http://localhost:8010/tag/get/${word}`)
                setTagsByInputWord((prevData) => ({
                    ...prevData,
                    tags: response.data.tags,
                    count: response.data.count
                }));
            } catch (error) {
                console.error('Error sending data:', error);
            }
        }else{
            setTagsByInputWord((prevData) => ({
                ...prevData,
                tags: [],
                count: 0
            }));
        }
    }

    const handleSendImage = async () => {
        if (!requestFile.image || !requestFile.name || !requestFile.description) {
            alert("Пожалуйста, заполните все поля");
            return;
        }

        console.log(requestFile);

        try {
            const response = await axios.post('http://localhost:8010/pins/add', requestFile, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    const handleMouseMove = useCallback(() => {
        setIsHover(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHover(false);
    }, []);

    return (
        <div className="create-page">
            <div className="create-page__caption">
                <span className="create-page__caption__name">Создание пина</span>
                <button type="button" onClick={handleSendImage}>
                    Отправить
                </button>
            </div>
            <div className="create-page__mainblock">
                <div className="create-page__mainblock__create-block">
                    <div className="create-page__mainblock__create-block__create-icon">
                        <label
                            style={{ display: file ? "none" : "block" }}
                            className="create-page__mainblock__create-block__create-icon__label"
                            htmlFor="fileInput"
                        >
                            <div className="create-page__mainblock__create-block__create-icon__label__block">
                                <p>Выберите файл</p>
                            </div>
                        </label>
                        <input
                            id="fileInput"
                            className="create-page__mainblock__create-block__create-icon__input-icon"
                            type="file"
                            name="image"
                            onChange={handleFileChange}
                        />
                        {file && (
                            <div
                                className="create-page__mainblock__create-block__create-icon__created-icon"
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                            >
                                <img
                                    src={file.preview}
                                    alt={file.file.name}
                                    className="create-page__mainblock__create-block__create-icon__created-icon__file"
                                />
                                <div
                                    className="create-page__mainblock__create-block__create-icon__created-icon__block"
                                    style={{ display: isHover ? "flex" : "none" }}
                                    onClick={handleRemoveFile}
                                >
                                    <FaSkullCrossbones className="create-page__mainblock__create-block__create-icon__created-icon__block__cross" />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="create-page__mainblock__create-block__description-icon">
                        <InputDescriptionForNewPin
                            Name="name"
                            name="Название"
                            placeholder="Название пина"
                            onChange={(value) => handleInputChange("name", value)}
                        />
                        <InputDescriptionForNewPin
                            Name="description"
                            name="Описание"
                            placeholder="Описание вашего пина"
                            textarea={true}
                            height="100px"
                            onChange={(value) => handleInputChange("description", value)}
                        />
                        <div className="className=create-page__mainblock__create-block__description-icon__search-tag">
                            <InputDescriptionForNewPin
                                Name="tegs"
                                name="Теги"
                                placeholder="Теги для вашего пина"
                                onChange={(value) => handleGetTagsByInputWord(value)}
                            />

                            {tagsByInputWord.tags && tagsByInputWord.tags.length > 0 && (
                                <div className="create-page__mainblock__create-block__description-icon__search-tag__tags">
                                    <div id = "default">
                                        <p>Доступные теги ({tagsByInputWord.count})</p>
                                    </div>
                                    {tagsByInputWord.tags.map((tag,index) =>
                                        <div id = "option" onClick={() => handleChooseTags(tag)}>{tag.name}</div>
                                    )
                                    }
                                </div>
                            )}
                        </div>
                        {chooseTags && chooseTags.length > 0 && (
                            <div className="create-page__mainblock__create-block__description-icon__choose-tags">
                                {chooseTags.map((tag,index) =>
                                        <div id = "choose-tag" >
                                            <p>{tag.name} <CgClose style={{
                                                marginTop: "2.5px",
                                                cursor: "pointer"
                                            }}
                                            onClick={() => handleDeleteTag(tag)}
                                            ></CgClose></p>
                                        </div>
                                    )
                                }
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

interface FileItem {
    file: File;
    preview: string;
}

interface FileRequest {
    image: File | null;
    name?: string;
    description?: string;
    idsTag?: number[];
}

interface TagsByInputWord {
    count: number
    tags?: Tag[];
}

interface Tag {
    id: number,
    name: string
}
