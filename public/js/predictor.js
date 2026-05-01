/**
 * predictor.js — "When's My First Vote?" Module
 * Handles election date predictions and eligibility checks.
 */

'use strict';

const predictorModule = (() => {
    /**
     * @description Simple frontend logger (silenced info for production)
     */
    const logger = {
        info: () => {}, // Disabled for production
        error: (...args) => console.error('[VoxPop ERROR]', ...args)
    };

    /**
     * @description Initialize predictor module
     */
    function init() {
        buildPredictorUI();
    }

    /**
     * @description Build UI for predictor section
     */
    function buildPredictorUI() {
        const section = document.getElementById('my-voxpop');
        if (!section) return;

        const predictorDiv = document.createElement('div');
        predictorDiv.className = 'predictor-wrapper';
        predictorDiv.innerHTML = `
            <div class="glass-card predictor-card">
                <h3 id="predict-title">When's My First Vote? 🗳️</h3>
                <p id="predict-sub">Find out when you can next exercise your democratic right.</p>

                <div class="predictor-form">
                    <div class="input-row">
                        <div class="input-group">
                            <label for="predict-country" id="label-country">Country</label>
                            <input type="text" id="predict-country" placeholder="e.g. India" value="India">
                        </div>
                        <div class="input-group">
                            <label for="predict-state" id="label-state">State / Province</label>
                            <input type="text" id="predict-state" placeholder="e.g. West Bengal">
                        </div>
                    </div>
                    
                    <div class="input-row">
                        <div class="input-group">
                            <label for="predict-election" id="label-election">Election Type</label>
                            <select id="predict-election">
                                <option value="General Election">General Election / Lok Sabha</option>
                                <option value="State Assembly">State Assembly</option>
                                <option value="Municipal">Municipal</option>
                                <option value="Presidential">Presidential</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <label for="predict-dob" id="label-dob">Date of Birth</label>
                            <input type="date" id="predict-dob">
                        </div>
                    </div>

                    <button id="predict-btn" class="btn btn-primary cta-btn">Predict My Next Vote</button>
                </div>

                <div id="predict-result" class="predict-result-box" style="display: none;">
                    <!-- Result will be injected here -->
                </div>
            </div>
        `;

        section.querySelector('.section-inner')?.appendChild(predictorDiv);
        document.getElementById('predict-btn')?.addEventListener('click', predictVote);
    }

    /**
     * @description Reads and validates form inputs for the predictor
     * @returns {Object|null} The form values, or null if validation fails
     */
    function getFormValues() {
        const country = document.getElementById('predict-country')?.value;
        const state = document.getElementById('predict-state')?.value;
        const electionType = document.getElementById('predict-election')?.value;
        const dob = document.getElementById('predict-dob')?.value;

        if (!country || !dob) {
            alert('Please enter your country and date of birth.');
            return null;
        }
        return { country, state, electionType, dob };
    }

    /**
     * @description Builds the HTML for the "happening now" badge
     * @param {Object} data - The API response data
     * @param {string} state - The state value from the form
     * @param {string} electionType - The election type value from the form
     * @returns {string} HTML string for the badge
     */
    const buildHappeningNowBadge = (data, state, electionType) => {
        if (state?.toLowerCase() === 'west bengal' && electionType === 'State Assembly') {
            return '<span class="now-badge">HAPPENING NOW 🔴</span>';
        }
        if (data.isHappeningNow) {
            return '<span class="now-badge">LIVE 🔴</span>';
        }
        return '';
    };

    /**
     * @description Renders the prediction result into the result box
     * @param {Object} data - The API response data
     * @param {HTMLElement} resultBox - The container element
     * @param {string} state - The state value from the form
     * @param {string} electionType - The election type from the form
     */
    const renderResult = (data, resultBox, state, electionType) => {
        const happeningNowBadge = buildHappeningNowBadge(data, state, electionType);
        resultBox.innerHTML = `
            <div class="result-card">
                ${happeningNowBadge}
                <h4>${data.electionName}</h4>
                <div class="date-highlight">${data.nextElectionDate}</div>
                <p><strong>What you're voting for:</strong> ${data.whatVotingFor}</p>
                <div class="status-badge ${data.isEligible ? 'eligible' : 'not-eligible'}">
                    ${data.isEligible ? '✅ You are eligible to vote!' : '⏳ You will be eligible soon!'}
                </div>
                <p class="disclaimer">${data.disclaimer}</p>
            </div>
        `;
    };

    /**
     * @description Predict the next vote based on user input and API response
     * @returns {Promise<void>}
     */
    async function predictVote() {
        const formValues = getFormValues();
        if (!formValues) return;

        const { country, state, electionType, dob } = formValues;
        const resultBox = document.getElementById('predict-result');
        if (!resultBox) return;

        resultBox.style.display = 'block';
        resultBox.innerHTML = '<p>Consulting the democratic calendar...</p>';

        try {
            const res = await fetch('/api/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ country, state, voterCardDate: dob, electionType })
            });

            const data = await res.json();
            renderResult(data, resultBox, state, electionType);

            if (window.voxpopAnalytics) {
                window.voxpopAnalytics.logEvent('predictor_used', { country, state, electionType });
            }

        } catch (err) {
            logger.error('Prediction error:', err);
            resultBox.innerHTML = '<p>Error predicting vote. Please try again later.</p>';
        }
    }

    return { init };
})();

// Initialize
document.addEventListener('DOMContentLoaded', () => predictorModule.init());

