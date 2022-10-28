import Link from 'next/link';

function Custom404() {
  return (
    <>
      <div className='text-center mt-10'>
        <div className='text-3xl font-semibold mb-10'>
          Ops! Página não encontrada.
        </div>
        <Link href='/'>
          <a>Voltar</a>
        </Link>
      </div>
    </>
  );
}

export default Custom404;
