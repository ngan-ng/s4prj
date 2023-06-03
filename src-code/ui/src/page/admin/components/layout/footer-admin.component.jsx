const FooterAdmin = () => {
    const getYear = new Date().getFullYear();
    return (
        <footer className="footer">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6">

                    </div>
                    <div className="col-sm-6">
                        <div className="text-sm-end d-none d-sm-block">
                            {getYear} © Crafted with <i className="mdi mdi-heart text-danger"></i>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterAdmin;
