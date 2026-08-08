const DATA = {"total_contacts": 41188, "total_subscriptions": 4640, "overall_conversion": 11.3, "monthly": [{"month": "Mar", "Contacts": 546, "Subscriptions": 276, "AvgDuration": 245.94688644688645, "ConversionRate": 50.5}, {"month": "Apr", "Contacts": 2632, "Subscriptions": 539, "AvgDuration": 293.20060790273556, "ConversionRate": 20.5}, {"month": "May", "Contacts": 13769, "Subscriptions": 886, "AvgDuration": 261.23175248747185, "ConversionRate": 6.4}, {"month": "Jun", "Contacts": 5318, "Subscriptions": 559, "AvgDuration": 242.56130124106807, "ConversionRate": 10.5}, {"month": "Jul", "Contacts": 7174, "Subscriptions": 649, "AvgDuration": 273.4261221076108, "ConversionRate": 9.0}, {"month": "Aug", "Contacts": 6178, "Subscriptions": 655, "AvgDuration": 232.43072191647784, "ConversionRate": 10.6}, {"month": "Sep", "Contacts": 570, "Subscriptions": 256, "AvgDuration": 297.70526315789476, "ConversionRate": 44.9}, {"month": "Oct", "Contacts": 718, "Subscriptions": 315, "AvgDuration": 288.36768802228414, "ConversionRate": 43.9}, {"month": "Nov", "Contacts": 4101, "Subscriptions": 416, "AvgDuration": 245.85564496464278, "ConversionRate": 10.1}, {"month": "Dec", "Contacts": 182, "Subscriptions": 89, "AvgDuration": 345.6098901098901, "ConversionRate": 48.9}], "segment": [{"job": "Admin", "Contacts": 10422, "Subscriptions": 1352, "ConversionRate": 13.0}, {"job": "Blue-Collar", "Contacts": 9254, "Subscriptions": 638, "ConversionRate": 6.9}, {"job": "Technician", "Contacts": 6743, "Subscriptions": 730, "ConversionRate": 10.8}, {"job": "Services", "Contacts": 3969, "Subscriptions": 323, "ConversionRate": 8.1}, {"job": "Management", "Contacts": 2924, "Subscriptions": 328, "ConversionRate": 11.2}, {"job": "Retired", "Contacts": 1720, "Subscriptions": 434, "ConversionRate": 25.2}, {"job": "Entrepreneur", "Contacts": 1456, "Subscriptions": 124, "ConversionRate": 8.5}, {"job": "Self-Employed", "Contacts": 1421, "Subscriptions": 149, "ConversionRate": 10.5}, {"job": "Housemaid", "Contacts": 1060, "Subscriptions": 106, "ConversionRate": 10.0}, {"job": "Unemployed", "Contacts": 1014, "Subscriptions": 144, "ConversionRate": 14.2}, {"job": "Student", "Contacts": 875, "Subscriptions": 275, "ConversionRate": 31.4}, {"job": "Unknown", "Contacts": 330, "Subscriptions": 37, "ConversionRate": 11.2}], "channel": [{"contact": "Cellular", "Contacts": 26144, "Subscriptions": 3853, "ConversionRate": 14.7}, {"contact": "Telephone", "Contacts": 15044, "Subscriptions": 787, "ConversionRate": 5.2}], "prior_outcome": [{"poutcome": "Prior Contact, Not Converted", "Contacts": 4252, "Subscriptions": 605, "ConversionRate": 14.2}, {"poutcome": "No Prior Contact", "Contacts": 35563, "Subscriptions": 3141, "ConversionRate": 8.8}, {"poutcome": "Prior Contact, Converted", "Contacts": 1373, "Subscriptions": 894, "ConversionRate": 65.1}], "age_band": [{"ageband": "18-30", "Contacts": 7378, "Subscriptions": 1122, "ConversionRate": 15.2}, {"ageband": "31-45", "Contacts": 21974, "Subscriptions": 2058, "ConversionRate": 9.4}, {"ageband": "46-60", "Contacts": 10921, "Subscriptions": 1044, "ConversionRate": 9.6}, {"ageband": "61+", "Contacts": 910, "Subscriptions": 414, "ConversionRate": 45.5}], "loan": [{"product": "Housing Loan", "holders": 21576, "share": 52.4, "conv": 11.6}, {"product": "Personal Loan", "holders": 6248, "share": 15.2, "conv": 10.9}]};

function fmtNum(n){ return n.toLocaleString('en-CA'); }
function fmtPct(n){ return n.toFixed(1) + '%'; }
function pillClass(rate){
  if(rate >= 20) return 'high';
  if(rate >= 10) return 'mid';
  return 'low';
}

// KPI cards
const kpis = [
  {label:'Total Contacts', value: fmtNum(DATA.total_contacts), sub:'Full campaign, Mar\u2013Dec'},
  {label:'New Accounts Opened', value: fmtNum(DATA.total_subscriptions), sub:'Term deposits subscribed'},
  {label:'Overall Conversion Rate', value: fmtPct(DATA.overall_conversion), sub:'Accounts opened / contacts'},
  {label:'Best Channel', value: fmtPct(Math.max(...DATA.channel.map(c=>c.ConversionRate))), sub: DATA.channel.reduce((a,b)=>a.ConversionRate>b.ConversionRate?a:b).contact + ' contact'},
  {label:'Best Segment', value: fmtPct(Math.max(...DATA.segment.map(s=>s.ConversionRate))), sub: DATA.segment.reduce((a,b)=>a.ConversionRate>b.ConversionRate?a:b).job + ' customers'},
];
document.getElementById('kpiRow').innerHTML = kpis.map(k => `
  <div class="kpi">
    <div class="kpi-label">${k.label}</div>
    <div class="kpi-value num">${k.value}</div>
    <div class="kpi-sub">${k.sub}</div>
  </div>
`).join('');

Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.font.size = 12;
Chart.defaults.color = '#5C6B82';

// Monthly conversion trend
new Chart(document.getElementById('chartMonth'), {
  type:'line',
  data:{
    labels: DATA.monthly.map(m=>m.month),
    datasets:[{
      label:'Conversion Rate',
      data: DATA.monthly.map(m=>m.ConversionRate),
      borderColor:'#B8860B',
      backgroundColor:'rgba(184,134,11,0.12)',
      fill:true, tension:.3, pointRadius:3, pointBackgroundColor:'#B8860B'
    }]
  },
  options:{
    plugins:{legend:{display:false}},
    scales:{ y:{ ticks:{callback:v=>v+'%'}, grid:{color:'#E3E8EF'} }, x:{grid:{display:false}} },
    maintainAspectRatio:false
  }
});

// Volume bar
new Chart(document.getElementById('chartVolume'), {
  type:'bar',
  data:{
    labels: DATA.monthly.map(m=>m.month),
    datasets:[
      {label:'Contacts', data: DATA.monthly.map(m=>m.Contacts), backgroundColor:'#13315C', borderRadius:3},
      {label:'New Accounts', data: DATA.monthly.map(m=>m.Subscriptions), backgroundColor:'#B8860B', borderRadius:3}
    ]
  },
  options:{
    plugins:{legend:{position:'top', align:'end', labels:{boxWidth:10}}},
    scales:{ y:{grid:{color:'#E3E8EF'}}, x:{grid:{display:false}} },
    maintainAspectRatio:false
  }
});

// Segment horizontal bar
const segSorted = [...DATA.segment].sort((a,b)=>b.ConversionRate-a.ConversionRate);
new Chart(document.getElementById('chartSegment'), {
  type:'bar',
  data:{
    labels: segSorted.map(s=>s.job),
    datasets:[{ data: segSorted.map(s=>s.ConversionRate), backgroundColor:'#0B2545', borderRadius:3 }]
  },
  options:{
    indexAxis:'y',
    plugins:{legend:{display:false}},
    scales:{ x:{ticks:{callback:v=>v+'%'}, grid:{color:'#E3E8EF'}}, y:{grid:{display:false}} },
    maintainAspectRatio:false
  }
});

// Prior outcome
new Chart(document.getElementById('chartPrior'), {
  type:'bar',
  data:{
    labels: DATA.prior_outcome.map(p=>p.poutcome),
    datasets:[{ data: DATA.prior_outcome.map(p=>p.ConversionRate), backgroundColor:['#13315C','#A6192E','#1E7145'], borderRadius:3 }]
  },
  options:{
    plugins:{legend:{display:false}},
    scales:{ y:{ticks:{callback:v=>v+'%'}, grid:{color:'#E3E8EF'}}, x:{grid:{display:false}} },
    maintainAspectRatio:false
  }
});

// Channel table
document.getElementById('tblChannel').innerHTML = `
  <tr><th>Channel</th><th class="num">Contacts</th><th class="num">New Accounts</th><th class="num">Conversion</th></tr>
  ${DATA.channel.map(c=>`
    <tr><td>${c.contact}</td><td class="num">${fmtNum(c.Contacts)}</td><td class="num">${fmtNum(c.Subscriptions)}</td>
    <td class="num"><span class="pill ${pillClass(c.ConversionRate)}">${fmtPct(c.ConversionRate)}</span></td></tr>
  `).join('')}
`;

// Loan table
document.getElementById('tblLoan').innerHTML = `
  <tr><th>Product</th><th class="num">Holders</th><th class="num">Share of Base</th><th class="num">Conversion</th></tr>
  ${DATA.loan.map(l=>`
    <tr><td>${l.product}</td><td class="num">${fmtNum(l.holders)}</td><td class="num">${fmtPct(l.share)}</td>
    <td class="num"><span class="pill ${pillClass(l.conv)}">${fmtPct(l.conv)}</span></td></tr>
  `).join('')}
`;

// Age band table
document.getElementById('tblAge').innerHTML = `
  <tr><th>Age Band</th><th class="num">Contacts</th><th class="num">New Accounts</th><th class="num">Conversion Rate</th></tr>
  ${DATA.age_band.map(a=>`
    <tr><td>${a.ageband}</td><td class="num">${fmtNum(a.Contacts)}</td><td class="num">${fmtNum(a.Subscriptions)}</td>
    <td class="num"><span class="pill ${pillClass(a.ConversionRate)}">${fmtPct(a.ConversionRate)}</span></td></tr>
  `).join('')}
`;
