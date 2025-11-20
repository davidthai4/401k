export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">
          401(k) Contribution Calculator
        </h1>
        <p className="text-gray-600">
          Your retirement planning tool
        </p>
        {/* Test element */}
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
          ✓ Tailwind is working!
        </div>
      </div>
    </div>
  )
}