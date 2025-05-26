import Input from '@/components/ui/Input';

function StepOne() {
	return (
		<form className="flex flex-1 flex-col items-center">
			<div className="flex w-full flex-col gap-8 lg:max-w-[700px] ">
				<div className="flex w-full flex-col gap-8 lg:max-w-[700px] ">
					<Input label="Email" id="email" type="email" placeholder="Email" required />
					<Input
						label="Nome"
						placeholder="Nome"
						id="firstName"
						type="text"
						pattern="^[A-Za-z ]*$"
						minLength={2}
						required
					/>
					<Input
						label="Cognome"
						placeholder="Cognome"
						id="lastName"
						type="text"
						pattern="^[A-Za-z ]*$"
						minLength={2}
						required
					/>
					<Input
						label="Data di nascita"
						placeholder="Data di nascita (DD/MM/YYYY)"
						id="dateOfBirth"
						type="date"
						required
					/>
					<Input
						label="Codice Fiscale"
						placeholder="Codice Fiscale"
						id="fiscalCode"
						type="text"
						pattern="^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$"
						minLength={16}
						maxLength={16}
						required
					/>
					<button>Continua</button>
				</div>
			</div>
		</form>
	);
}

export default StepOne;
