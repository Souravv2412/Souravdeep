// ---- 2026 CRA figures (verified) ----
const LIMITS = {
  tfsaAnnual: 7000,
  tfsaLifetime: 109000, // eligible since 2009
  rrspRate: 0.18,
  rrspCap2026: 33810,
  fhsaAnnual: 8000,
  fhsaLifetime: 40000,
  fedBracket2Threshold: 58523 // 2026 federal second-bracket start
};

let selectedRisk = 'moderate';
document.querySelectorAll('.risk-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.risk-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedRisk = btn.dataset.risk;
  });
});

function fmtCur(n){
  return '$' + Math.round(n).toLocaleString('en-CA');
}
function fmtCurDec(n){
  return '$' + n.toLocaleString('en-CA', {minimumFractionDigits:2, maximumFractionDigits:2});
}

function buildRecommendation(profile){
  const { age, income, goal, target, years, risk } = profile;
  const monthlyIncome = income / 12;
  const monthlyEssential = monthlyIncome * 0.5; // rule-of-thumb essential spend, disclosed in UI

  const emergencyMonths = risk === 'conservative' ? 6 : (risk === 'moderate' ? 4 : 3);
  const emergencyTarget = monthlyEssential * emergencyMonths;

  const rrspRoom = Math.min(income * LIMITS.rrspRate, LIMITS.rrspCap2026);
  const tfsaRoom = LIMITS.tfsaAnnual;
  const fhsaRoom = LIMITS.fhsaAnnual;

  const isFirstTimeBuyerEligible = age >= 18 && age <= 71;
  const canOpenRRSP = age <= 71;

  let primary, secondary, allocation, steps = [];

  const monthlySavingsNeeded = (target && years && years > 0) ? (target / (years * 12)) : null;

  if (goal === 'home') {
    if (isFirstTimeBuyerEligible) {
      primary = {
        tag: 'Primary Account',
        title: 'First Home Savings Account (FHSA)',
        body: `Purpose-built for this goal: contributions are tax-deductible like an RRSP, and withdrawals for a qualifying first home purchase are completely tax-free, like a TFSA. For a first-time buyer this beats both accounts used alone.`,
        facts: [
          ['Annual Room', fmtCur(fhsaRoom)],
          ['Lifetime Max', fmtCur(LIMITS.fhsaLifetime)]
        ]
      };
      secondary = {
        tag: 'Supporting Account',
        title: 'RRSP, via the Home Buyers\u2019 Plan',
        body: `Once the FHSA is contributing steadily, RRSP savings can also go toward the home: the Home Buyers\u2019 Plan lets a first-time buyer withdraw up to $60,000 tax-free from an RRSP for the purchase, repayable over 15 years. Worth opening once the FHSA is on track, not instead of it.`,
        facts: [ ['Est. Annual RRSP Room', fmtCur(rrspRoom)], ['HBP Withdrawal Limit', '$60,000'] ]
      };
    } else {
      primary = {
        tag: 'Primary Account',
        title: 'TFSA',
        body: `FHSA eligibility requires the client to be 18 to 71. Outside that window, a TFSA is the next-best vehicle for a home down payment: fully flexible, tax-free growth, and no restriction on what the withdrawal is used for.`,
        facts: [ ['Annual Room', fmtCur(tfsaRoom)], ['Lifetime Room (if 18+ since 2009)', fmtCur(LIMITS.tfsaLifetime)] ]
      };
      secondary = {
        tag: 'Supporting Account',
        title: 'High-Interest Savings / Short-Term GIC',
        body: `For the portion of the down payment needed within the next 1 to 2 years, capital preservation matters more than growth. A short-term GIC ladder keeps the money guaranteed and available close to the purchase date.`,
        facts: [ ['Typical Term', '90 days to 1 year'] ]
      };
    }
    allocation = riskAllocation(risk, years, 'home');
    steps = [
      `Confirm the client is a genuine first-time buyer (has not owned a home they lived in during this year or the four preceding calendar years).`,
      `Open the FHSA and set up an automatic monthly contribution toward the ${fmtCur(fhsaRoom)} annual room.`,
      `Build the emergency fund in parallel at a lower priority. Do not delay the FHSA to finish the emergency fund first, since FHSA room that goes unused this year is partially lost (only $1,000 in unused room carries forward).`,
      monthlySavingsNeeded ? `To reach ${fmtCur(target)} in ${years} year(s), the client needs to save about ${fmtCur(monthlySavingsNeeded)} a month across the FHSA and any supporting account.` : `Ask for a target amount and timeframe next time to calculate a monthly savings figure.`
    ];
  } else if (goal === 'retirement') {
    const leanRRSP = income > LIMITS.fedBracket2Threshold;
    if (leanRRSP && canOpenRRSP) {
      primary = {
        tag: 'Primary Account',
        title: 'RRSP',
        body: `At this income the client is in the 20.5% federal bracket or higher, so the RRSP tax deduction is worth more today than it would be at a lower income. Contributions reduce taxable income now, and the account grows tax-deferred until withdrawal in retirement, ideally at a lower tax bracket.`,
        facts: [ ['Est. Annual Room', fmtCur(rrspRoom)], ['2026 Dollar Cap', fmtCur(LIMITS.rrspCap2026)] ]
      };
      secondary = {
        tag: 'Supporting Account',
        title: 'TFSA',
        body: `Once the RRSP contribution is on track, the TFSA adds flexibility: withdrawals are tax-free and don't affect government benefits later in life the way RRSP withdrawals can.`,
        facts: [ ['Annual Room', fmtCur(tfsaRoom)] ]
      };
    } else {
      primary = {
        tag: 'Primary Account',
        title: 'TFSA',
        body: `At this income level the RRSP tax deduction is worth less, since the client is in the lowest federal bracket already. A TFSA keeps contributions and growth fully tax-free with no impact on future government benefit clawbacks, which usually makes it the stronger starting point.`,
        facts: [ ['Annual Room', fmtCur(tfsaRoom)], ['Lifetime Room (if 18+ since 2009)', fmtCur(LIMITS.tfsaLifetime)] ]
      };
      secondary = {
        tag: 'Supporting Account',
        title: 'RRSP',
        body: `Still worth opening for the long term, especially in higher-earning years later in the client's career when the deduction is worth more. Unused RRSP room carries forward indefinitely, so there's no rush.`,
        facts: [ ['Est. Annual Room', fmtCur(rrspRoom)] ]
      };
    }
    allocation = riskAllocation(risk, years, 'retirement');
    steps = [
      `Confirm whether the client has a workplace pension. A pension adjustment reduces RRSP room, so their real number may be lower than the 18% estimate here.`,
      leanRRSP ? `Prioritize the RRSP contribution before the March 2 deadline if it should count toward the prior tax year.` : `Prioritize maxing the TFSA first, then revisit RRSP room as income grows.`,
      `Set the contribution to automatic and matched to payday, since consistency matters more than the amount for a retirement goal.`,
      `Review the split annually. As income rises through their career, the RRSP typically becomes relatively more valuable.`
    ];
  } else if (goal === 'emergency') {
    primary = {
      tag: 'Primary Account',
      title: 'High-Interest Savings Account or TFSA (held as cash)',
      body: `An emergency fund needs to be available on short notice without penalty or market risk, so this is one of the few goals where growth potential should take a back seat to liquidity. A TFSA held in cash or a high-interest savings product keeps it tax-free and accessible.`,
      facts: [ ['Target', fmtCur(emergencyTarget)], ['Coverage', `${emergencyMonths} months of essential spending`] ]
    };
    secondary = {
      tag: 'Supporting Account',
      title: 'Cashable GIC (for the portion not needed instantly)',
      body: `Once 1 to 2 months of the fund is sitting in easy-access savings, the remainder can sit in a cashable or short-term GIC for a better rate while still being accessible within days if needed.`,
      facts: [ ['Typical Term', '30 to 90 days, cashable'] ]
    };
    allocation = riskAllocation(risk, years, 'emergency');
    steps = [
      `Confirm the client's essential monthly spending directly rather than estimating, this changes the target significantly.`,
      `Set up automatic transfers on payday until the ${fmtCur(emergencyTarget)} target is reached.`,
      `Keep this fund separate from other savings so it isn't accidentally spent on a non-emergency.`,
      `Once funded, redirect the same automatic transfer toward the client's next goal (retirement, home, etc).`
    ];
  } else if (goal === 'shortterm') {
    const nearTerm = years && years <= 2;
    primary = {
      tag: 'Primary Account',
      title: nearTerm ? 'GIC Ladder or High-Interest Savings' : 'TFSA',
      body: nearTerm
        ? `With the goal less than 2 years out, capital preservation matters more than growth. A GIC ladder (staggering maturities every few months) balances a guaranteed return with access to cash as each GIC matures.`
        : `With more runway before the goal, a TFSA lets the client benefit from tax-free growth while still being able to withdraw the full amount, principal and gains, when the goal date arrives.`,
      facts: nearTerm
        ? [ ['Typical Term', '3 to 18 months'] ]
        : [ ['Annual Room', fmtCur(tfsaRoom)] ]
    };
    secondary = {
      tag: 'Supporting Account',
      title: nearTerm ? 'TFSA (for the flexible portion)' : 'Short-Term GIC (as the date approaches)',
      body: nearTerm
        ? `Any portion of the goal the client might delay can stay in the TFSA for flexibility, since GICs lock in a term.`
        : `In the final 6 to 12 months before the goal, shift the balance into a short GIC or savings account to lock in the value and remove market timing risk right before the purchase.`,
      facts: []
    };
    allocation = riskAllocation(risk, years, 'shortterm');
    steps = [
      monthlySavingsNeeded ? `To reach ${fmtCur(target)} in ${years} year(s), the client needs to save about ${fmtCur(monthlySavingsNeeded)} a month.` : `Ask for a target amount and timeframe to calculate a monthly savings figure.`,
      `Confirm whether the date is fixed (e.g. a wedding) or flexible, this changes how much risk is appropriate.`,
      nearTerm ? `Favor guaranteed products over growth-oriented ones given the short timeline.` : `Revisit the allocation as the goal date gets closer and shift toward guaranteed products.`
    ];
  } else { // wealth
    primary = {
      tag: 'Primary Account',
      title: 'TFSA',
      body: `For general wealth building with no fixed deadline, the TFSA is usually the best starting point: contributions and all growth stay completely tax-free forever, and there's no penalty for withdrawing if plans change.`,
      facts: [ ['Annual Room', fmtCur(tfsaRoom)], ['Lifetime Room (if 18+ since 2009)', fmtCur(LIMITS.tfsaLifetime)] ]
    };
    secondary = {
      tag: 'Supporting Account',
      title: 'RRSP',
      body: income > LIMITS.fedBracket2Threshold
        ? `At this income, RRSP contributions also make sense once the TFSA is being maxed, since the tax deduction is meaningful at this bracket.`
        : `Worth opening once income grows into a higher bracket, where the deduction becomes more valuable. No rush at the current income level.`,
      facts: [ ['Est. Annual Room', fmtCur(rrspRoom)] ]
    };
    allocation = riskAllocation(risk, years, 'wealth');
    steps = [
      `Establish the emergency fund first if one doesn't already exist (see the Emergency Fund card above).`,
      `Automate a fixed contribution to the TFSA every payday rather than relying on lump sums.`,
      `Revisit the RRSP once income or tax bracket increases.`,
      `Review the goal itself periodically, general wealth building often turns into a more specific goal (home, retirement) over time.`
    ];
  }

  return { emergencyTarget, emergencyMonths, rrspRoom, tfsaRoom, fhsaRoom, primary, secondary, allocation, steps, monthlySavingsNeeded };
}

function riskAllocation(risk, years, goalType){
  // Suggested split between guaranteed (cash/GIC) and tax-advantaged growth accounts (TFSA/RRSP/FHSA invested)
  // This is an account-structure allocation for advisor conversation purposes, not a securities recommendation.
  let guaranteed;
  if (goalType === 'emergency') guaranteed = 90;
  else if (risk === 'conservative') guaranteed = 60;
  else if (risk === 'moderate') guaranteed = 35;
  else guaranteed = 15;

  if (years && years <= 2 && goalType !== 'retirement') guaranteed = Math.max(guaranteed, 70);

  return { guaranteed, growth: 100 - guaranteed };
}

let chartInstance = null;

function render(rec, profile){
  const el = document.getElementById('results');
  el.innerHTML = `
    <div class="kpi-row">
      <div class="kpi">
        <div class="kpi-label">Emergency Fund Target</div>
        <div class="kpi-value num">${fmtCur(rec.emergencyTarget)}</div>
        <div class="kpi-sub">${rec.emergencyMonths} months of essential spending, based on ${profile.risk} risk tolerance</div>
      </div>
      <div class="kpi">
        <div class="kpi-label">Est. TFSA Room (2026)</div>
        <div class="kpi-value num">${fmtCur(rec.tfsaRoom)}</div>
        <div class="kpi-sub">Assumes no prior contributions. Actual room may be higher with carry-forward.</div>
      </div>
      <div class="kpi">
        <div class="kpi-label">Est. RRSP Room (2026)</div>
        <div class="kpi-value num">${fmtCur(rec.rrspRoom)}</div>
        <div class="kpi-sub">18% of income, capped at $33,810. Reduced by any workplace pension adjustment.</div>
      </div>
    </div>

    <div class="rec-grid">
      <div class="rec-card">
        <div class="rec-tag">${rec.primary.tag}</div>
        <div class="rec-title">${rec.primary.title}</div>
        <div class="rec-body">${rec.primary.body}</div>
        ${rec.primary.facts.length ? `<div class="rec-facts">${rec.primary.facts.map(f => `<div><div class="rec-fact-label">${f[0]}</div><div class="rec-fact-value">${f[1]}</div></div>`).join('')}</div>` : ''}
      </div>
      <div class="rec-card secondary">
        <div class="rec-tag">${rec.secondary.tag}</div>
        <div class="rec-title">${rec.secondary.title}</div>
        <div class="rec-body">${rec.secondary.body}</div>
        ${rec.secondary.facts.length ? `<div class="rec-facts">${rec.secondary.facts.map(f => `<div><div class="rec-fact-label">${f[0]}</div><div class="rec-fact-value">${f[1]}</div></div>`).join('')}</div>` : ''}
      </div>
    </div>

    <div class="grid2">
      <div class="panel">
        <h2>Suggested Guaranteed vs. Growth Split</h2>
        <p class="hint">How much to hold in cash / GICs vs. tax-advantaged growth accounts</p>
        <div class="chart-wrap"><canvas id="allocChart"></canvas></div>
      </div>
      <div class="panel">
        <h2>Recommended Next Steps</h2>
        <p class="hint">The order an advisor would walk through with this client</p>
        <ol class="steps">
          ${rec.steps.map((s,i) => `<li><div class="step-num">${i+1}</div><div class="step-text">${s}</div></li>`).join('')}
        </ol>
      </div>
    </div>

    <div class="disclaimer">
      Figures use 2026 CRA contribution limits (TFSA $7,000/yr, RRSP 18% of income up to $33,810, FHSA $8,000/yr up to $40,000 lifetime) and a simplified assumption that essential spending is 50% of gross income. Actual contribution room depends on CRA My Account history, workplace pension adjustments, and prior withdrawals. This tool illustrates advisor-style reasoning for a portfolio project and is not financial, investment, or tax advice.
    </div>
  `;

  const ctx = document.getElementById('allocChart');
  if (chartInstance) chartInstance.destroy();
  chartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Guaranteed (Cash / GIC)', 'Tax-Advantaged Growth (TFSA / RRSP / FHSA)'],
      datasets: [{
        data: [rec.allocation.guaranteed, rec.allocation.growth],
        backgroundColor: ['#B8860B', '#0B2545'],
        borderWidth: 0
      }]
    },
    options: {
      plugins: {
        legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 } } },
        tooltip: { callbacks: { label: (c) => c.label + ': ' + c.raw + '%' } }
      },
      cutout: '65%',
      maintainAspectRatio: false
    }
  });
}

document.getElementById('calcBtn').addEventListener('click', () => {
  const age = parseFloat(document.getElementById('age').value) || 0;
  const income = parseFloat(document.getElementById('income').value) || 0;
  const goal = document.getElementById('goal').value;
  const target = parseFloat(document.getElementById('target').value) || null;
  const years = parseFloat(document.getElementById('years').value) || null;

  const profile = { age, income, goal, target, years, risk: selectedRisk };
  const rec = buildRecommendation(profile);
  render(rec, profile);
});

// Run once on load with the default sample profile
document.getElementById('calcBtn').click();
