import React from 'react';

class Signin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }
    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value });
    }
    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value });
    }
    onSubmitSignIn = () => {
        if (this.state.signInEmail.indexOf('@') < 1 || this.state.signInEmail.indexOf('.com') < 3) {
            return alert('email é um campo obrigatório e está invalido');
        }
        if (this.state.signInPassword.length >= 4) {
            console.log('vis');
            fetch('https://young-brook-76506.herokuapp.com/signin', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: this.state.signInEmail,
                    password: this.state.signInPassword
                })
            })
                .then(response => response.json())
                .then(user => {
                    if (user.id) {
                        console.log(user.id);
                        this.props.loadUser(user)
                        this.props.onRouteChange('home');
                    }
                })
        } else {
            return alert('senha é um campo obrigatório e está invalido');
        }
    }
    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Logar</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    onChange={this.onEmailChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Senha</label>
                                <input
                                    onChange={this.onPasswordChange}
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password" />
                            </div>
                        </fieldset>
                        <div className="">
                            <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Fazer login" />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Registrar</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Signin;