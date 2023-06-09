import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container } from 'react-bootstrap';
import { faBars} from '@fortawesome/free-solid-svg-icons';
import DashboardHeader from '../../Header/DashboardHeader/DashboardHeader';
import leftSideNav from '../../Utilities/Utilities';
import CategoryTag from '../CategoryTag/CategoryTag';
import ResponsiveTopLink from '../TopLink/ResponsiveTopLink/ResponsiveTopLink';
import LeftNavBar from '../LeftNavBar/LeftNavBar';
import QuestionsBlock from '../QuestionsBlock/QuestionsBlock';
import TopLink from '../TopLink/TopLink';
import { baseUrl } from '../../../services/api';
import axios from 'axios';
const Dashboard = () => {
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [refetch, setRefetch] = useState(0)

    return (
            <div>
                <DashboardHeader setSearch={setSearch} search={search} setSearchResult={setSearchResult}></DashboardHeader>
                <Container fluid>
                    <div className="ouestion-answer-section">
                        <ResponsiveTopLink refetch={refetch} setRefetch={setRefetch}></ResponsiveTopLink>
                        <div className="hero-section-content d-flex rsp-SideP position-relative">
                            <LeftNavBar></LeftNavBar>
                            <QuestionsBlock search={search} searchResult={searchResult} refetch={refetch} setRefetch={setRefetch}></QuestionsBlock>
                            <div className="resp-condition">
                                <TopLink  refetch={refetch} setRefetch={setRefetch}></TopLink>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>  
    );
};

export default Dashboard;