import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IMG1 from '../../assets/images/addmin.webp';

function AdminLogin() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('AdminUser');
    // const storedPass = localStorage.getItem('AdminPassword');

    if (storedUser) {
      navigate('/admin');
    }
  }, [navigate]);

  function handleSubmit(e) {
    e.preventDefault();

    if (user.toLowerCase() === 'admin' && password.toLowerCase() === 'admin') {
      localStorage.setItem('AdminUser', user);
      // localStorage.setItem('AdminPassword', password);
      navigate('/admin');
    } else {
      alert('Invalid Credentials!');
      setUser('');
      setPassword('');
    }
  }

  return (
    <div>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card">
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img style={{ width: '300px', height: '500px' }} src={IMG1} className="d-block w-100" alt="Admin" />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={handleSubmit}>
                        <h5 className="fw-normal mb-3 pb-3">Sign into your account</h5>
                        <div className="form-outline mb-4">
                          <input value={user} onChange={(e) => setUser(e.target.value)} type="text" className="form-control form-control-lg" placeholder="Username" required />
                        </div>
                        <div className="form-outline mb-4">
                          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control form-control-lg" placeholder="Password" required />
                        </div>
                        <div className="pt-1 mb-4">
                          <button className="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminLogin;