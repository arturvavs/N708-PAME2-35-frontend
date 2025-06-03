import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../services/api';
import './TicketForm.css';

function TicketForm({ user, token }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
      setFileName(selectedImage.name);
      
      // Criar preview da imagem
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !description || !address) {
      setError('Preencha todos os campos obrigatórios');
      return;
    }
    
    if (!image) {
      setError('Por favor, anexe uma imagem do problema');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('address', address);
      formData.append('image', image);
      
      const response = await fetch(`${API_BASE_URL}/tickets`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar ticket');
      }
      
      navigate('/dashboard?message=Ticket criado com sucesso!');
    } catch (err) {
      console.error('Erro na criação do ticket:', err);
      setError(err.message || 'Erro ao criar ticket');
    } finally {
      setLoading(false);
    }
  };

  // Verificar se todos os campos obrigatórios estão preenchidos
  const isFormValid = title && description && address && image;

  return (
    <div className="form-container">
      <h1>Reportar Problema</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Título *</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Ex: Buraco na calçada"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="address">Endereço *</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder="Ex: Rua das Flores, 123 - Centro"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Descrição *</label>
          <textarea
            id="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Descreva o problema em detalhes..."
          ></textarea>
        </div>
        
        <div className="form-group">
          <label>Imagem do Problema *</label>
          <p className="image-requirement-note">
            É obrigatório anexar uma foto do problema para que as empresas possam avaliar adequadamente.
          </p>
          
          <div className="file-input-container">
            <label className="file-input-label">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              Selecionar Imagem
            </label>
            {fileName && <span className="file-name">✓ {fileName}</span>}
          </div>
          
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}
        </div>
        
        <div className="form-buttons">
          <button 
            type="button" 
            className="btn btn-outline" 
            onClick={() => navigate('/dashboard')}
            disabled={loading}
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            className={`btn btn-primary ${!isFormValid ? 'btn-disabled' : ''}`}
            disabled={loading || !isFormValid}
            title={!isFormValid ? 'Preencha todos os campos e anexe uma imagem' : ''}
          >
            {loading ? 'Criando...' : 'Criar Ticket'}
          </button>
        </div>
      </form>
      
      <div className="info-note">
        <p><strong>Dica:</strong> A imagem é fundamental para que as empresas possam avaliar o problema e fornecer um serviço adequado.</p>
      </div>
    </div>
  );
}

export default TicketForm;
