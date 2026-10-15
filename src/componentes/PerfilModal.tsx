import React, { useEffect, useState } from 'react';
import type { UserProfile } from '../types/index';

interface PerfilModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile | null;
  onSaveProfile: (profile: UserProfile) => void;
  profileMessage: string;
  setProfileMessage: (msg: string) => void;
}

export const PerfilModal = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
  profileMessage,
  setProfileMessage,
}: PerfilModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setEmail(profile.email || '');
    }
  }, [profile]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName || !trimmedEmail) return;

    onSaveProfile({ name: trimmedName, email: trimmedEmail });
    setProfileMessage('Datos guardados. Ya puedes finalizar tu compra.');
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal-backdrop ${isOpen ? 'is-open' : ''}`}
      id="profile-modal"
      aria-hidden={!isOpen}
      onClick={handleBackdropClick}
    >
      <section
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-title"
      >
        <button
          type="button"
          className="modal-close"
          data-close-modal
          aria-label="Cerrar perfil"
          onClick={onClose}
        >
          &times;
        </button>
        <i className="fa-solid fa-circle-user modal-icon"></i>
        <h2 id="profile-title">Mi perfil</h2>
        <p className="modal-intro">Guarda tus datos para agilizar tu compra.</p>
        <form id="profile-form" className="profile-form" onSubmit={handleSubmit}>
          <label htmlFor="profile-name">Nombre completo</label>
          <input
            id="profile-name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
          />
          <label htmlFor="profile-email">Correo electrónico</label>
          <input
            id="profile-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="btn-primary" type="submit">
            Guardar datos
          </button>
        </form>
        <p className="form-message" id="profile-message" aria-live="polite">
          {profileMessage}
        </p>
      </section>
    </div>
  );
};
