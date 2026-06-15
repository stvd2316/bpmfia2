import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAllPeraturan, setShowAllPeraturan] = useState(false);
  const [selectedPeraturan, setSelectedPeraturan] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToAllPeraturan = () => {
    setShowAllPeraturan(true);
    setSelectedPeraturan(null);
    window.scrollTo(0, 0);
  };

  const goToHome = () => {
    setShowAllPeraturan(false);
    setSelectedPeraturan(null);
    window.scrollTo(0, 0);
  };

  const viewDetail = (item: any) => {
    setSelectedPeraturan(item);
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    setSelectedPeraturan(null);
    window.scrollTo(0, 0);
  };

  // Data Peraturan
  const peraturanData = [
    {
      id: 1,
      judul: "Hukum Acara Mahkamah Mahasiswa Fakultas Ilmu Administrasi Universitas Indonesia",
      jenisDokumen: "Undang - Undang IKM",
      tahun: "2024",
      tglPenetapan: "04-11-2024",
      tempatPenetapan: "Depok",
      tglBerlaku: "04-11-2024",
      status: "Berlaku",
      perubahanTerkini: [
        { nomor: "003/PER/BPMFIAUI/III/2026", judul: "Peraturan Perubahan Kedua" },
        { nomor: "002/PER/BPMFIAUI/I/2026", judul: "Peraturan Perubahan Pertama" }
      ]
    },
    {
      id: 2,
      judul: "Mekanisme Pengajuan Usul Inisiatif Mahasiswa",
      jenisDokumen: "Peraturan BPM",
      tahun: "2024",
      tglPenetapan: "15-09-2024",
      tempatPenetapan: "Depok",
      tglBerlaku: "15-09-2024",
      status: "Berlaku",
      perubahanTerkini: [
        { nomor: "005/PER/BPMFIAUI/II/2026", judul: "Penyesuaian Mekanisme Pengajuan" }
      ]
    },
    {
      id: 3,
      judul: "Standar Kode Etik Anggota Legislatif",
      jenisDokumen: "Peraturan BPM",
      tahun: "2024",
      tglPenetapan: "20-05-2024",
      tempatPenetapan: "Depok",
      tglBerlaku: "20-05-2024",
      status: "Berlaku",
      perubahanTerkini: []
    },
    {
      id: 4,
      judul: "Pengelolaan Keuangan Organisasi Mahasiswa",
      jenisDokumen: "Peraturan BPM",
      tahun: "2024",
      tglPenetapan: "10-01-2024",
      tempatPenetapan: "Depok",
      tglBerlaku: "10-01-2024",
      status: "Tidak Berlaku",
      perubahanTerkini: []
    }
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

        :root {
          --primary: #1B3C5A;
          --primary-dark: #142D45;
          --accent: #C5A059;
          --accent-hover: #B08D45;
          --bg-light: #F4F6F8;
          --text-dark: #1F1F1F;
          --text-gray: #6C757D;
          --white: #FFFFFF;
          --border-color: #dee2e6;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          font-family: 'Poppins', sans-serif;
          background-color: var(--bg-light);
          color: var(--text-dark);
          -webkit-font-smoothing: antialiased;
        }

        /* NAVBAR */
        .navbar {
          position: fixed; top: 0; left: 0; width: 100%;
          display: flex; justify-content: space-between; align-items: center;
          padding: 15px 5%; z-index: 1000; transition: all 0.3s ease;
          background: ${scrolled || showAllPeraturan || selectedPeraturan ? 'var(--white)' : 'transparent'};
          box-shadow: ${scrolled || showAllPeraturan || selectedPeraturan ? '0 2px 15px rgba(0,0,0,0.1)' : 'none'};
          padding: ${scrolled || showAllPeraturan || selectedPeraturan ? '10px 5%' : '15px 5%'};
        }

        .nav-logo { display: flex; align-items: center; gap: 12px; cursor: pointer; }
        .nav-logo img { height: 45px; transition: height 0.3s ease; }
        .navbar.scrolled .nav-logo img, .page-peraturan .nav-logo img { height: 38px; }

        .nav-logo-text {
          display: flex; flex-direction: column; font-weight: 700; font-size: 1.1rem; line-height: 1.2;
          transition: color 0.3s ease; text-align: left; align-items: flex-start;
          color: ${scrolled || showAllPeraturan || selectedPeraturan ? 'var(--primary)' : 'var(--white)'};
        }
        .nav-logo-text span:last-child { font-weight: 500; font-size: 0.8rem; letter-spacing: 0.5px; }

        .nav-links { display: flex; list-style: none; gap: 30px; }
        .nav-links a {
          color: ${scrolled || showAllPeraturan || selectedPeraturan ? 'var(--text-dark)' : 'var(--white)'};
          text-decoration: none; font-weight: 500; font-size: 0.95rem; position: relative;
          transition: color 0.3s ease; cursor: pointer;
        }
        .nav-links a::after {
          content: ''; position: absolute; width: 0; height: 2px; bottom: -5px; left: 0;
          background-color: var(--accent); transition: width 0.3s ease;
        }
        .nav-links a:hover::after { width: 100%; }

        .menu-toggle { display: none; flex-direction: column; gap: 5px; cursor: pointer; z-index: 1001; }
        .menu-toggle span {
          width: 25px; height: 3px;
          background: ${scrolled || showAllPeraturan || selectedPeraturan ? 'var(--text-dark)' : 'var(--white)'};
          transition: all 0.3s ease;
        }

        /* HERO & STATS */
        .hero {
          position: relative; height: 100vh; min-height: 600px; display: flex; align-items: center;
          justify-content: center; text-align: center;
          background: url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop') center/cover no-repeat;
        }
        .hero::before {
          content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(rgba(27, 60, 90, 0.85), rgba(20, 45, 69, 0.95));
        }
        .hero-content { position: relative; z-index: 2; color: var(--white); padding: 0 20px; max-width: 800px; }
        .hero-badge {
          display: inline-block; background: var(--accent); color: var(--white); padding: 6px 16px;
          border-radius: 20px; font-size: 0.85rem; font-weight: 600; margin-bottom: 20px;
        }
        .hero h1 { font-size: 3.5rem; font-weight: 800; margin-bottom: 20px; line-height: 1.2; }
        .hero p { font-size: 1.2rem; font-weight: 300; margin-bottom: 40px; opacity: 0.9; }

        .btn-primary {
          display: inline-block; background: var(--accent); color: var(--white); padding: 14px 32px;
          text-decoration: none; font-weight: 600; border-radius: 6px; border: none; cursor: pointer;
          font-family: 'Poppins', sans-serif; font-size: 1rem; transition: all 0.3s ease;
        }
        .btn-primary:hover { background: var(--accent-hover); transform: translateY(-2px); }

        .stats-section {
          background: var(--white); padding: 60px 5%; margin-top: -60px; position: relative; z-index: 3;
          max-width: 1000px; margin-left: auto; margin-right: auto; border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.08); display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
        }
        .stat-item { text-align: center; padding: 20px; border-right: 1px solid #eee; }
        .stat-item:last-child { border-right: none; }
        .stat-number { font-size: 2.8rem; font-weight: 800; color: var(--primary); line-height: 1; margin-bottom: 8px; }
        .stat-label { font-size: 1rem; color: var(--text-gray); font-weight: 500; }

        /* SECTION & CARDS */
        .section { padding: 80px 5%; }
        .section-header { text-align: center; margin-bottom: 50px; }
        .section-header h2 {
          font-size: 2.2rem; font-weight: 700; color: var(--primary); margin-bottom: 10px;
          position: relative; display: inline-block;
        }
        .section-header h2::after {
          content: ''; display: block; width: 60px; height: 4px; background: var(--accent);
          margin: 10px auto 0; border-radius: 2px;
        }
        .section-header p { color: var(--text-gray); font-size: 1rem; max-width: 600px; margin: 0 auto; }

        .cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 30px; max-width: 1200px; margin: 0 auto; }
        .card {
          background: var(--white); border-radius: 10px; overflow: hidden; border: 1px solid #eee;
          box-shadow: 0 5px 20px rgba(0,0,0,0.05); transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex; flex-direction: column;
        }
        .card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .card-header {
          background: var(--primary); padding: 15px 20px; color: var(--white); font-weight: 600;
          display: flex; justify-content: space-between; align-items: center;
        }
        .card-date { font-size: 0.8rem; opacity: 0.8; }
        .card-body { padding: 25px 20px; flex-grow: 1; display: flex; flex-direction: column; }
        .card-title { font-size: 1.1rem; font-weight: 600; color: var(--text-dark); margin-bottom: 15px; line-height: 1.4; flex-grow: 1; min-height: 60px; }
        .btn-outline {
          display: inline-block; border: 2px solid var(--primary); color: var(--primary); padding: 8px 20px;
          text-decoration: none; font-weight: 600; font-size: 0.9rem; border-radius: 4px; transition: all 0.3s ease;
          align-self: flex-start; margin-top: auto; cursor: pointer; background: transparent; font-family: 'Poppins', sans-serif;
        }
        .btn-outline:hover { background: var(--primary); color: var(--white); }

        .btn-more-container { text-align: center; margin-top: 50px; }
        .btn-back {
          display: inline-flex; align-items: center; gap: 8px; margin-bottom: 30px; color: var(--primary);
          font-weight: 600; font-size: 1rem; cursor: pointer; background: none; border: none;
          font-family: 'Poppins', sans-serif; transition: color 0.3s ease;
        }
        .btn-back:hover { color: var(--accent); }

        /* ====================================== */
        /*     DETAIL PAGE SPECIFIC               */
        /* ====================================== */
        .page-peraturan-container { padding-top: 100px; }

        .detail-layout {
          max-width: 1000px; margin: 0 auto; background: var(--white); padding: 50px;
          border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }

        .detail-title {
          font-size: 1.6rem; font-weight: 700; color: var(--text-dark); line-height: 1.4;
          margin-bottom: 30px; text-align: left;
        }

        /* Kotak Info Dokumen (Rata Kiri Presisi) */
        .info-box {
          background-color: #f8f9fa; border: 1px solid var(--border-color); border-radius: 8px;
          padding: 25px; margin-bottom: 30px;
        }
        .info-row {
          display: flex; padding: 10px 0; border-bottom: 1px solid #e9ecef; align-items: flex-start;
        }
        .info-row:last-child { border-bottom: none; }
        .info-label {
          font-weight: 600; color: var(--primary); width: 220px; flex-shrink: 0; font-size: 0.95rem;
          text-align: left; /* PERUBAHAN: Teks label diubah menjadi rata kiri */
        }
        .info-value {
          color: var(--text-dark); font-size: 0.95rem; flex-grow: 1; text-align: left; padding-left: 10px;
        }
        .status-badge {
          display: inline-block; padding: 4px 12px; border-radius: 20px; font-weight: 600; font-size: 0.85rem;
        }
        .status-berlaku { background-color: #d1e7dd; color: #0f5132; }
        .status-tidak-berlaku { background-color: #f8d7da; color: #842029; }

        /* Tombol Aksi */
        .action-buttons { display: flex; gap: 15px; margin-bottom: 40px; flex-wrap: wrap; }
        .action-btn {
          display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; border-radius: 6px;
          font-weight: 600; font-size: 0.9rem; cursor: pointer; transition: all 0.2s ease;
          text-decoration: none; font-family: 'Poppins', sans-serif;
        }
        .action-btn.primary { background: var(--primary); color: var(--white); border: none; }
        .action-btn.primary:hover { background: var(--primary-dark); }
        .action-btn.outline { background: transparent; color: var(--primary); border: 1px solid var(--primary); }
        .action-btn.outline:hover { background: var(--primary); color: var(--white); }

        /* Heading Tabel Bawah */
        .sub-heading {
          font-size: 1.2rem; font-weight: 700; color: var(--primary); margin-top: 40px;
          margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid var(--accent); display: inline-block;
        }

        /* Tabel Perubahan Terbaru */
        .amendment-table { width: 100%; border-collapse: collapse; margin-bottom: 40px; font-size: 0.95rem; }
        .amendment-table th {
          text-align: left; padding: 12px 15px; background-color: var(--primary); color: var(--white);
          font-weight: 500; border: 1px solid var(--primary);
        }
        .amendment-table td {
          padding: 12px 15px; border: 1px solid var(--border-color); color: var(--text-dark);
        }
        .amendment-table tr:nth-child(even) { background-color: #f8f9fa; }

        /* FOOTER */
        .footer { background: var(--primary-dark); color: var(--white); padding: 60px 5% 30px; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 40px; max-width: 1200px; margin: 0 auto; }
        .footer-about h3, .footer-links h4 { margin-bottom: 20px; font-weight: 700; color: var(--accent); }
        .footer-about p { font-size: 0.9rem; line-height: 1.8; opacity: 0.8; }
        .footer-links ul { list-style: none; }
        .footer-links ul li { margin-bottom: 10px; }
        .footer-links ul li a { color: rgba(255,255,255,0.8); text-decoration: none; transition: color 0.3s ease; font-size: 0.95rem; cursor: pointer; }
        .footer-links ul li a:hover { color: var(--accent); }
        .social-links { display: flex; gap: 15px; margin-top: 20px; }
        .social-links a {
          display: flex; align-items: center; justify-content: center; width: 40px; height: 40px;
          background: rgba(255,255,255,0.1); border-radius: 50%; color: var(--white); text-decoration: none;
          transition: background 0.3s ease;
        }
        .social-links a:hover { background: var(--accent); }
        .footer-bottom {
          text-align: center; margin-top: 40px; padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.1); font-size: 0.85rem; opacity: 0.6;
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .nav-links {
            display: none; position: absolute; top: 0; left: 0; width: 100%; height: 100vh;
            background: var(--primary-dark); flex-direction: column; align-items: center; justify-content: center; gap: 40px;
          }
          .nav-links.active { display: flex; }
          .nav-links.active a { color: var(--white) !important; font-size: 1.2rem; }
          .menu-toggle { display: flex; }
          .hero h1 { font-size: 2.2rem; }
          .stats-section { grid-template-columns: repeat(3, 1fr); margin-top: -40px; padding: 30px 3%; }
          .stat-item { border-right: 1px solid #eee; padding: 10px; }
          .stat-number { font-size: 1.8rem; }
          .stat-label { font-size: 0.8rem; }
          .section { padding: 60px 5%; }
          .cards-grid { grid-template-columns: 1fr; }
          .footer-grid { grid-template-columns: 1fr; text-align: center; }
          .social-links { justify-content: center; }
          .nav-logo-text { font-size: 0.9rem; }
          .nav-logo-text span:last-child { font-size: 0.65rem; }

          /* Detail Responsive */
          .detail-layout { padding: 20px; }
          .detail-title { font-size: 1.3rem; }
          .info-row { flex-direction: column; gap: 4px; }
          .info-label { width: 100%; font-size: 0.85rem; }
          .info-value { font-size: 0.85rem; padding-left: 0; }
          .action-buttons { flex-direction: column; }
          .action-btn { width: 100%; justify-content: center; }
          .amendment-table { font-size: 0.85rem; }
          .amendment-table th, .amendment-table td { padding: 8px 10px; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className={`navbar ${scrolled || showAllPeraturan || selectedPeraturan ? 'scrolled' : ''} ${(showAllPeraturan || selectedPeraturan) ? 'page-peraturan' : ''}`}>
        <div className="nav-logo" onClick={goToHome}>
          <img src="/logoui.svg" alt="Logo FIA UI" />
          <div className="nav-logo-text">
            <span>BPM FIA UI</span>
            <span>Badan Perwakilan Mahasiswa</span>
          </div>
        </div>
        
        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li><a onClick={() => { goToHome(); setMenuOpen(false); }}>Beranda</a></li>
          <li><a onClick={() => { goToAllPeraturan(); setMenuOpen(false); }}>Peraturan</a></li>
          <li><a onClick={() => { goToHome(); setMenuOpen(false); }}>Berita</a></li>
          <li><a onClick={() => { goToHome(); setMenuOpen(false); }}>Kontak</a></li>
        </ul>

        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span><span></span>
        </div>
      </nav>

      {/* KONDISI HALAMAN */}
      {!showAllPeraturan && !selectedPeraturan ? (
        /* HALAMAN BERANDA */
        <>
          <section className="hero" id="beranda">
            <div className="hero-content">
              <div className="hero-badge">SELAMAT DATANG</div>
              <h1>Badan Perwakilan Mahasiswa FIA UI</h1>
              <p>Mewakili suara mahasiswa, menjunjung tinggi demokrasi, dan berkomitmen untuk menciptakan lingkungan kampus yang lebih baik.</p>
              <button onClick={goToAllPeraturan} className="btn-primary">Jelajahi Peraturan</button>
            </div>
          </section>

          <div className="stats-section">
            <div className="stat-item"><div className="stat-number">13</div><div className="stat-label">Dokumen</div></div>
            <div className="stat-item"><div className="stat-number">7</div><div className="stat-label">Berlaku</div></div>
            <div className="stat-item"><div className="stat-number">3</div><div className="stat-label">Dicabut</div></div>
          </div>

          <section className="section" id="peraturan">
            <div className="section-header">
              <h2>Peraturan Terbaru</h2>
              <p>Daftar regulasi dan peraturan terkini yang dikeluarkan oleh BPM FIA UI</p>
            </div>
            <div className="cards-grid">
              {peraturanData.map((item) => (
                <div className="card" key={item.id}>
                  <div className="card-header">
                    <span>Peraturan</span>
                    <span className="card-date">{item.tahun}</span>
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">{item.jenisDokumen} tentang {item.judul}</h3>
                    <button className="btn-outline" onClick={() => viewDetail(item)}>View</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="btn-more-container">
              <button onClick={goToAllPeraturan} className="btn-primary">More</button>
            </div>
          </section>

          <section className="section" id="berita" style={{ backgroundColor: 'var(--white)' }}>
            <div className="section-header">
              <h2>Berita Terbaru</h2>
              <p>Informasi dan kabar terkini seputar kegiatan legislatif mahasiswa</p>
            </div>
            <div className="cards-grid">
              <div className="card">
                <div className="card-header" style={{ background: 'var(--accent)' }}><span>Berita</span><span className="card-date">10 Juni 2026</span></div>
                <div className="card-body"><h3 className="card-title">Rapat Pleno Pembahasan Anggaran Organisasi Semester Genap 2025/2026</h3><button className="btn-outline">Baca Selengkapnya</button></div>
              </div>
              <div className="card">
                <div className="card-header" style={{ background: 'var(--accent)' }}><span>Berita</span><span className="card-date">2 Juni 2026</span></div>
                <div className="card-body"><h3 className="card-title">Konsolidasi Internal Persiapan Musyawarah Mahasiswa Tahunan</h3><button className="btn-outline">Baca Selengkapnya</button></div>
              </div>
              <div className="card">
                <div className="card-header" style={{ background: 'var(--accent)' }}><span>Berita</span><span className="card-date">20 Mei 2026</span></div>
                <div className="card-body"><h3 className="card-title">Aspirasi Mahasiswa: Evaluasi Kinerja BEM FIA UI Periode 2025/2026</h3><button className="btn-outline">Baca Selengkapnya</button></div>
              </div>
            </div>
          </section>
        </>
      ) : selectedPeraturan ? (
        /* HALAMAN DETAIL PERATURAN */
        <div className="page-peraturan-container">
          <section className="section">
            <button className="btn-back" onClick={goBack}>← Kembali ke Daftar Peraturan</button>
            
            <div className="detail-layout">
              {/* 1. Judul Besar */}
              <h1 className="detail-title">
                {selectedPeraturan.jenisDokumen} tentang {selectedPeraturan.judul}
              </h1>

              {/* 2. Kotak Info Dokumen (Rata Kiri Presisi) */}
              <div className="info-box">
                <div className="info-row">
                  <div className="info-label">Judul</div>
                  <div className="info-value">{selectedPeraturan.judul}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Jenis Dokumen</div>
                  <div className="info-value">{selectedPeraturan.jenisDokumen}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Tahun</div>
                  <div className="info-value">{selectedPeraturan.tahun}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Tanggal Penetapan</div>
                  <div className="info-value">{selectedPeraturan.tglPenetapan}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Tempat Penetapan</div>
                  <div className="info-value">{selectedPeraturan.tempatPenetapan}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Tanggal Berlaku</div>
                  <div className="info-value">{selectedPeraturan.tglBerlaku}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Status</div>
                  <div className="info-value">
                    <span className={`status-badge ${selectedPeraturan.status === 'Berlaku' ? 'status-berlaku' : 'status-tidak-berlaku'}`}>
                      {selectedPeraturan.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. Tombol Aksi */}
              <div className="action-buttons">
                <button className="action-btn primary">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM9 10.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/></svg>
                  View Document
                </button>
                <button className="action-btn outline">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/><path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/></svg>
                  Download
                </button>
                <button className="action-btn outline">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/></svg>
                  Riwayat
                </button>
              </div>

              {/* 4. Tabel Peraturan Terbaru yang Mengubah */}
              <h2 className="sub-heading">Peraturan Terbaru yang Mengubah</h2>
              {selectedPeraturan.perubahanTerkini.length > 0 ? (
                <table className="amendment-table">
                  <thead>
                    <tr>
                      <th>Nomor Peraturan</th>
                      <th>Judul Peraturan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPeraturan.perubahanTerkini.map((amandemen: any, index: number) => (
                      <tr key={index}>
                        <td>{amandemen.nomor}</td>
                        <td>{amandemen.judul}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p style={{ color: 'var(--text-gray)', marginBottom: '40px' }}>Belum ada peraturan perubahan untuk dokumen ini.</p>
              )}

            </div>
          </section>
        </div>
      ) : (
        /* HALAMAN SEMUA PERATURAN */
        <div className="page-peraturan-container">
          <section className="section">
            <button className="btn-back" onClick={goToHome}>← Kembali ke Beranda</button>
            <div className="section-header">
              <h2>Semua Peraturan</h2>
              <p>Daftar lengkap regulasi dan peraturan yang dikeluarkan oleh BPM FIA UI</p>
            </div>
            <div className="cards-grid">
              {peraturanData.map((item) => (
                <div className="card" key={item.id}>
                  <div className="card-header">
                    <span>Peraturan</span>
                    <span className="card-date">{item.tahun}</span>
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">{item.jenisDokumen} tentang {item.judul}</h3>
                    <button className="btn-outline" onClick={() => viewDetail(item)}>View</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* FOOTER */}
      <footer className="footer" id="kontak">
        <div className="footer-grid">
          <div className="footer-about">
            <h3>BPM FIA UI</h3>
            <p>Badan Perwakilan Mahasiswa Fakultas Ilmu Administrasi Universitas Indonesia merupakan lembaga perwakilan mahasiswa yang berfungsi sebagai legislator, aspirator, dan kontrol terhadap lembaga eksekutif mahasiswa.</p>
            <div className="social-links">
              <a href="https://www.instagram.com/bpmfiaui?igsh=ZHlraXVuMjR6eHE0" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://x.com/BPMFIAUI" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>
          <div className="footer-links">
            <h4>Navigasi</h4>
            <ul>
              <li><a onClick={goToHome}>Beranda</a></li>
              <li><a onClick={goToAllPeraturan}>Peraturan</a></li>
              <li><a onClick={goToHome}>Berita</a></li>
              <li><a onClick={goToHome}>Kontak</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Kontak</h4>
            <ul>
              <li><a href="#">Gedung FIA UI, Depok</a></li>
              <li><a href="#">bpmfiaui@gmail.com</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">&copy; {new Date().getFullYear()} BPM FIA UI. All Rights Reserved.</div>
      </footer>
    </>
  );
};

export default App;