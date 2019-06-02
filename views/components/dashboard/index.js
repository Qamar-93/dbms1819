import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import cookie from 'react-cookies';
import Access from '../accessDenied/index';
import './index.css';
class Dashboard extends Component {
  render() {

    return (
      <section className='dashboard'>
        {cookie.load('token')? (
          <div className='dashboard__container' >
            <aside className='dashboardNav'>
              <ul>
                <NavLink to='/' className='nav__logo'>
                  <img src='/img/logo.png' alt='GIRIH'/>
                </NavLink>
                <NavLink to='/dashboard/news'>
                  <li>
                    News
                  </li>
                </NavLink>
                <NavLink to='/dashboard/projects'>
                  <li>
                    Projects
                  </li>
                </NavLink>
                <NavLink to='/dashboard/applicants'>
                  <li>
                    Aplicants
                  </li>
                </NavLink>
                <NavLink to='/dashboard/services'>
                  <li>
                    Services
                  </li>
                </NavLink>
                <NavLink to='/dashboard/team'>
                  <li>
                    Team Members
                  </li>
                </NavLink>
              </ul>
            </aside>
            <main className='mainDash'>
              {this.props.children}
            </main>
          </div>
        ): <Access/> }
      </section>
    );
  }
}

export default (Dashboard);
