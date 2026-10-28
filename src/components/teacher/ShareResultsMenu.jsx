import React, { useState, useRef, useEffect } from 'react';

export default function ShareResultsMenu({ results = {}, quizzes = {} }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef(null);

  const resultList = Object.values(results);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Generate plain text report
  const generateReportText = () => {
    const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const timeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    let msg = `📊 *GPTK QUIZ PORTAL — EXAMINATION RESULTS REPORT*\n`;
    msg += `🏛️ *Government Polytechnic, Kadur-197*\n`;
    msg += `📅 Date: ${dateStr} at ${timeStr}\n`;
    msg += `👥 Total Submissions: ${resultList.length}\n`;
    msg += `────────────────────────────\n\n`;

    if (resultList.length === 0) {
      msg += `No candidate submissions recorded yet.\n`;
    } else {
      resultList.forEach((r, idx) => {
        const pct = Number(r.percentage || 0);
        const isPass = pct >= 35;
        const violations = Number(r.violations || 0);
        msg += `${idx + 1}. *${r.studentName || 'Student'}* (${r.rollNo || 'N/A'})\n`;
        msg += `   📚 Quiz: ${r.quizTitle || 'Assessment'}\n`;
        msg += `   🎯 Score: ${r.score}/${r.total} (${pct}% — ${isPass ? 'PASS ✅' : 'FAIL ❌'})\n`;
        msg += `   🛡️ Integrity: ${violations === 0 ? 'Clean Record ✓' : `${violations} Alert(s) ⚠️`}\n`;
        msg += `   ⏰ Attended: ${r.attendedDate || dateStr} at ${r.attendedTime || timeStr}\n\n`;
      });
    }

    msg += `────────────────────────────\n`;
    msg += `🌐 Portal: https://gptkquiz.web.app\n`;
    msg += `© 2026 Government Polytechnic, Kadur-197`;
    return msg;
  };

  // 1. Copy Results to Clipboard
  const handleCopy = async () => {
    const text = generateReportText();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        throw new Error('Clipboard fallback');
      }
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setOpen(false);
    }, 1200);
  };

  // 2. Share on WhatsApp
  const handleWhatsApp = () => {
    const text = generateReportText();
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setOpen(false);
  };

  // 3. Print as PDF with clean A4 layout, title, table and signatures
  const handlePrintPdf = () => {
    const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const timeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const totalCount = resultList.length;
    const passCount = resultList.filter(r => Number(r.percentage || 0) >= 35).length;
    const failCount = totalCount - passCount;
    const cleanCount = resultList.filter(r => (Number(r.violations) || 0) === 0).length;

    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();

    const tableRowsHtml = resultList.length === 0
      ? `<tr><td colspan="8" style="text-align: center; padding: 24px; color: #64748b;">No candidate submissions recorded.</td></tr>`
      : resultList.map((r, i) => {
          const pct = Number(r.percentage || 0);
          const isPass = pct >= 35;
          const clean = (Number(r.violations) || 0) === 0;
          return `
            <tr style="background: ${i % 2 === 0 ? '#ffffff' : '#f8fafc'};">
              <td style="padding: 10px 12px; border: 1px solid #cbd5e1; text-align: center; font-weight: 600;">${i + 1}</td>
              <td style="padding: 10px 12px; border: 1px solid #cbd5e1; font-weight: 700; color: #0f172a;">${r.rollNo || '—'}</td>
              <td style="padding: 10px 12px; border: 1px solid #cbd5e1; font-weight: 600;">${r.studentName || '—'}</td>
              <td style="padding: 10px 12px; border: 1px solid #cbd5e1; color: #334155;">${r.quizTitle || 'Assessment'}</td>
              <td style="padding: 10px 12px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700;">${r.score} / ${r.total}</td>
              <td style="padding: 10px 12px; border: 1px solid #cbd5e1; text-align: center; font-weight: 800; color: ${isPass ? '#16a34a' : '#dc2626'};">${pct}%</td>
              <td style="padding: 10px 12px; border: 1px solid #cbd5e1; text-align: center;">
                <span style="display: inline-block; padding: 3px 8px; border-radius: 6px; font-weight: 800; font-size: 11px; background: ${isPass ? '#dcfce7' : '#fee2e2'}; color: ${isPass ? '#15803d' : '#b91c1c'}; border: 1px solid ${isPass ? '#86efac' : '#fca5a5'};">
                  ${isPass ? 'PASS' : 'FAIL'}
                </span>
              </td>
              <td style="padding: 10px 12px; border: 1px solid #cbd5e1; text-align: center; font-size: 11px;">
                <span style="color: ${clean ? '#16a34a' : '#d97706'}; font-weight: 700;">
                  ${clean ? '✓ Clean' : `⚠️ ${r.violations} Alert(s)`}
                </span>
              </td>
            </tr>
          `;
        }).join('');

    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>GPTK Quiz Results Report - Government Polytechnic, Kadur-197</title>
          <style>
            @page {
              size: A4 portrait;
              margin: 12mm 15mm;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
              color: #0f172a;
              margin: 0;
              padding: 0;
              background: #ffffff;
            }
            .header-wrap {
              text-align: center;
              border-bottom: 2px solid #0284c7;
              padding-bottom: 14px;
              margin-bottom: 16px;
            }
            .inst-name {
              font-size: 21px;
              font-weight: 800;
              color: #0f172a;
              letter-spacing: -0.3px;
              text-transform: uppercase;
              margin-bottom: 2px;
            }
            .inst-dept {
              font-size: 13px;
              font-weight: 600;
              color: #475569;
              margin-bottom: 6px;
            }
            .report-title {
              display: inline-block;
              background: #0284c7;
              color: #ffffff;
              padding: 4px 14px;
              border-radius: 6px;
              font-size: 12px;
              font-weight: 800;
              letter-spacing: 0.5px;
              text-transform: uppercase;
            }
            .meta-grid {
              display: flex;
              justifyContent: space-between;
              background: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 8px;
              padding: 10px 16px;
              margin-bottom: 16px;
              font-size: 12px;
            }
            .meta-item strong {
              color: #0f172a;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              font-size: 12px;
            }
            th {
              background: #0f172a;
              color: #ffffff;
              padding: 10px 12px;
              border: 1px solid #0f172a;
              font-size: 11px;
              font-weight: 800;
              text-transform: uppercase;
              letter-spacing: 0.4px;
            }
            .sig-section {
              margin-top: 40px;
              display: flex;
              justifyContent: space-between;
              padding: 0 20px;
              font-size: 12px;
            }
            .sig-box {
              text-align: center;
              width: 200px;
              border-top: 1px solid #0f172a;
              padding-top: 6px;
              font-weight: 700;
            }
            .footer {
              margin-top: 24px;
              border-top: 1px solid #e2e8f0;
              padding-top: 8px;
              font-size: 10px;
              color: #64748b;
              display: flex;
              justifyContent: space-between;
            }
          </style>
        </head>
        <body>
          <div class="header-wrap">
            <div class="inst-name">Government Polytechnic, Kadur-197</div>
            <div class="inst-dept">Department of Technical Education, Karnataka • Examination & Assessment Wing</div>
            <div class="report-title">Official Candidate Submissions & Results Scorecard</div>
          </div>

          <div class="meta-grid">
            <div class="meta-item">📅 <strong>Report Date:</strong> ${dateStr} (${timeStr})</div>
            <div class="meta-item">👥 <strong>Total Candidates:</strong> ${totalCount}</div>
            <div class="meta-item">📊 <strong>Pass Rate:</strong> ${passCount} Passed (${totalCount > 0 ? Math.round((passCount / totalCount) * 100) : 0}%) / ${failCount} Failed</div>
            <div class="meta-item">🛡️ <strong>Integrity:</strong> ${cleanCount}/${totalCount} Clean Records</div>
          </div>

          <table>
            <thead>
              <tr>
                <th style="width: 40px;">#</th>
                <th>Register No</th>
                <th>Candidate Name</th>
                <th>Quiz Set</th>
                <th style="width: 80px;">Score</th>
                <th style="width: 75px;">Percentage</th>
                <th style="width: 70px;">Result</th>
                <th style="width: 90px;">Integrity</th>
              </tr>
            </thead>
            <tbody>
              ${tableRowsHtml}
            </tbody>
          </table>

          <div class="sig-section">
            <div class="sig-box">Faculty / Examiner Signature</div>
            <div class="sig-box">HOD / Chief Superintendent</div>
          </div>

          <div class="footer">
            <span>Generated from GPTK Online Examination Portal (https://gptkquiz.web.app)</span>
            <span>Vedha Park Opp Kadur Taluk, Karnataka 577548</span>
          </div>
        </body>
      </html>
    `);

    doc.close();
    iframe.contentWindow.focus();
    setTimeout(() => {
      iframe.contentWindow.print();
      setTimeout(() => {
        if (iframe.parentNode) {
          iframe.parentNode.removeChild(iframe);
        }
      }, 1500);
    }, 400);

    setOpen(false);
  };

  return (
    <div ref={menuRef} style={{ position: 'relative', display: 'inline-block' }}>
      {/* ── Main Share Button ── */}
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          border: '1px solid rgba(52, 211, 153, 0.45)',
          color: '#ffffff',
          padding: '11px 22px',
          borderRadius: '12px',
          fontSize: '13px',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          boxShadow: '0 4px 18px rgba(16, 185, 129, 0.35)',
          transition: 'all 0.18s ease'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #059669 0%, #047857 100%)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        }}
      >
        <span style={{ fontSize: '15px' }}>📤</span>
        <span>Share Results</span>
        <span style={{
          fontSize: '10px',
          opacity: 0.8,
          transform: open ? 'rotate(180deg)' : 'none',
          transition: 'transform 0.18s ease'
        }}>
          ▼
        </span>
      </button>

      {/* ── Dropdown Menu with 3 Actions ── */}
      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          right: 0,
          zIndex: 1000,
          minWidth: '290px',
          background: 'rgba(13, 21, 39, 0.94)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          borderRadius: '18px',
          padding: '8px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          animation: 'fadeIn 0.15s ease'
        }}>
          <div style={{
            padding: '6px 12px 4px',
            fontSize: '11px',
            fontWeight: 800,
            color: 'rgba(255, 255, 255, 0.5)',
            textTransform: 'uppercase',
            letterSpacing: '0.6px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            Export & Share Options ({resultList.length} submissions)
          </div>

          {/* Action 1: Copy the Result */}
          <button
            type="button"
            onClick={handleCopy}
            style={{
              background: copied ? 'rgba(34, 197, 94, 0.18)' : 'rgba(255, 255, 255, 0.04)',
              border: copied ? '1px solid rgba(34, 197, 94, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '10px 14px',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)')}
            onMouseLeave={e => (e.currentTarget.style.background = copied ? 'rgba(34, 197, 94, 0.18)' : 'rgba(255, 255, 255, 0.04)')}
          >
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              background: 'rgba(56, 189, 248, 0.16)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              flexShrink: 0
            }}>
              📋
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: copied ? '#4ade80' : '#ffffff' }}>
                {copied ? '✓ Copied to Clipboard!' : 'Copy the Result'}
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.55)', marginTop: '2px' }}>
                Copy formatted marks & status list
              </div>
            </div>
          </button>

          {/* Action 2: Share on WhatsApp */}
          <button
            type="button"
            onClick={handleWhatsApp}
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '10px 14px',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)')}
          >
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              background: 'rgba(34, 197, 94, 0.16)',
              border: '1px solid rgba(34, 197, 94, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              flexShrink: 0
            }}>
              💬
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff' }}>
                Share on WhatsApp
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.55)', marginTop: '2px' }}>
                Send directly to student / faculty groups
              </div>
            </div>
          </button>

          {/* Action 3: Print as PDF */}
          <button
            type="button"
            onClick={handlePrintPdf}
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '10px 14px',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)')}
          >
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              background: 'rgba(239, 68, 68, 0.16)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              flexShrink: 0
            }}>
              🖨️
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff' }}>
                Print as PDF
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.55)', marginTop: '2px' }}>
                Official PDF with college header & table
              </div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
